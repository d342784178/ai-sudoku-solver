import {MetadataRoute} from 'next'
import {absoluteUrl} from "@/lib/util/commonUtil";

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
            url: absoluteUrl('/game/create'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl('/blog/what-is-sudoku'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: absoluteUrl('/blog/how-does-sudoku-work'),
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