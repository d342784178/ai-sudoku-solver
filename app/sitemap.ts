import {MetadataRoute} from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://ai-sudoku.top',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    ]
}