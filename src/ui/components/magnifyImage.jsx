import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import image from "../../assets/1.jpg"
const ProductImageMagnifier = ({url}) => {

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
    <div style={{ width: '400px' }}>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: 'Product',
            isFluidWidth: true,
            src: image, // Replace with your image URL
          },
          largeImage: {
            src: image, // High-res image
            width: 1200,
            height: 1800,
          },
          enlargedImageContainerDimensions: {
            width: '150%',
            height: '100%',
          },
          enlargedImagePosition: 'beside', // Shows magnified image on the right
        }}
      />
    </div>
    </div>
  );
};

export default ProductImageMagnifier;
