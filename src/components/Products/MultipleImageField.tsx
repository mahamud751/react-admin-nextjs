import React, { FC } from "react";
import { useRecordContext } from "react-admin";
import { Box, Typography } from "@mui/material";

interface MultipleImageFieldProps {
  source: string;
  title: string;
}

const MultipleImageField: FC<MultipleImageFieldProps> = ({ source, title }) => {
  const record = useRecordContext();
  console.log(record);

  const images: string[] | undefined = record ? record[source] : undefined;

  if (!images || images.length === 0) {
    return <Typography>No images</Typography>;
  }

  return (
    <Box>
      {images?.map((image, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <img
            src={image}
            alt={`${title} ${index + 1}`}
            style={{ maxWidth: "40px", height: "40px" }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default MultipleImageField;
