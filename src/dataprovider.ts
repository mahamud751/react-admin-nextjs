"use client";
import {
  DataProvider,
  fetchUtils,
  CreateParams,
  CreateResult,
  RaRecord,
  Identifier,
} from "react-admin";
import axios from "axios";
import { useState } from "react";

const apiUrl = "http://localhost:8080/v1";
const httpClient = fetchUtils.fetchJson;
const [photos, setPhotos] = useState<File[]>([]);
// Upload photo to Cloudinary
const uploadPhotoToCloudinary = async (photo: File) => {
  try {
    const formData = new FormData();
    formData.append("file", photo); // Add file as binary
    formData.append("upload_preset", "upload");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dtpvtjiry/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return {
      title: response.data.original_filename,
      src: response.data.secure_url,
    };
  } catch (error) {
    console.error("Error uploading photo to Cloudinary:", error);
    throw error;
  }
};

// Convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    return httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({
      data: json.data
        ? json.data.map((record: any) => ({ ...record, id: record.id }))
        : [],
      total: json.total || 0,
    }));
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      if (!json.data || !json.data.id) {
        throw new Error(
          `The response from the API does not contain an 'id' field.`
        );
      }
      return {
        data: { ...json.data, id: json.data.id },
      };
    }),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${query}`).then(({ json }) => ({
      data: json.data
        ? json.data.map((record: any) => ({ ...record, id: record.id }))
        : [],
    }));
  },

  getManyReference: (resource, params) => {
    const query = {
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    return httpClient(`${apiUrl}/${resource}?${query}`).then(({ json }) => ({
      data: json.data
        ? json.data.map((record: any) => ({ ...record, id: record.id }))
        : [],
      total: json.total || 0,
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: json.data ? { ...json.data, id: json.data.id } : {},
    })),

  updateMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }).then(({ json }) => ({
          id: json.data?.id || id,
        }))
      )
    ).then((responses) => ({
      data: responses.map((response) => response.id),
    }));
  },

  create: async <
    RecordType extends Omit<RaRecord, "id"> = any,
    ResultRecordType extends RaRecord = RecordType & { id: Identifier }
  >(
    resource: string,
    params: CreateParams<RecordType>
  ): Promise<CreateResult<ResultRecordType>> => {
    const { photos = [], files = [], ...data } = params.data;
    let photoData: { title: string; src: string }[] = [];
    let fileData: { title: string; src: string }[] = [];

    try {
      // Upload photos to Cloudinary

      for (const photo of photos) {
        const uploadedPhoto = await uploadPhotoToCloudinary(photo);
        photoData.push(uploadedPhoto);
      }

      // Send the final payload to the backend
      const response = await httpClient(`${apiUrl}/${resource}`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          photos: photoData,
          files: fileData,
        }),
      });

      if (!response.json.data || !response.json.data.id) {
        throw new Error("API response does not contain the required data.");
      }

      const result: ResultRecordType = {
        ...response.json.data,
        id: response.json.data.id,
      };

      return { data: result };
    } catch (error) {
      console.error("Error in create method:", error);
      return Promise.reject(error);
    }
  },

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => ({
      data: json.data ? json.data : {},
    })),

  deleteMany: (resource, params) => {
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: "DELETE",
        }).then(({ json }) => ({
          id: json.data?.id || id,
        }))
      )
    ).then((responses) => ({
      data: responses.map((response) => response.id),
    }));
  },
};

export default dataProvider;
