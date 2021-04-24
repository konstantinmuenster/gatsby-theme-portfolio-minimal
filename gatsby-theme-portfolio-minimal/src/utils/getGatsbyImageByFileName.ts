import { GatsbyImageQueryResultList, GatsbyImageData } from '../types/graphql';

export function getGatsbyImageByFileName(imageList: GatsbyImageQueryResultList, fileName: string): GatsbyImageData {
    const filterResult = imageList.allFile.images.filter((image) => {
        return image.name + image.ext === fileName;
    });
    if (filterResult.length === 0) {
        throw new Error('Referenced image not found. Please check the image file name.');
    } else if (filterResult.length > 1) {
        throw new Error('Multiple images with the same file name found. File names has to be unique.');
    } else {
        return filterResult[0];
    }
}
