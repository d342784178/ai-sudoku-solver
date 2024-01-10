import {MetadataRoute} from 'next'
import {absoluteUrl} from "@/app/lib/util/commonUtil";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: absoluteUrl(''),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl('/game'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl('/blog/how-to-play-sudoku'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        }
    ]
}