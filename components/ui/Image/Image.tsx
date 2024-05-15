import NextImage, { ImageProps } from 'next/image';
import React from 'react';

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />;

export default Image;