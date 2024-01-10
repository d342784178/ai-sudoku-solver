// page.tsx
import {notFound} from "next/navigation";
import {allPosts} from "contentlayer/generated";

import {Mdx} from "@/components/mdx/mdx-components";

import "@/styles/mdx.css";
import {Metadata} from "next";
import {siteConfig} from "@/config/site";
import {absoluteUrl} from "@/app/lib/util/commonUtil";

// import { absoluteUrl } from "@/lib/utils";

interface PageProps {
    params: {
        slug: string[];
    };
}

async function getPageFromParams(params: { slug: string[] }) {
    const slug = '/' + params?.slug?.join("/");
    const page = allPosts.find((page) => page.slug === slug);
    if (!page) {
        return null;
    }

    return page;
}

// 下面OG的代码如果适用你的项目，你可以取消注释
export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    const page = await getPageFromParams(params);

    if (!page) {
        return {};
    }

    const url = process.env.NEXT_PUBLIC_APP_URL;

    const ogUrl = new URL(`${url}/api/og`);
    ogUrl.searchParams.set("heading", page.title);
    ogUrl.searchParams.set("type", siteConfig.name);
    ogUrl.searchParams.set("mode", "light");

    return {
        title: page.title,
        description: page.description,
        openGraph: {
            title: page.title,
            description: page.description,
            type: "article",
            url: absoluteUrl('/blog/' + page.slug),
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: page.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: page.title,
            description: page.description,
            images: [ogUrl.toString()],
        },
    };
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
    return allPosts.map((page) => ({
        slug: page.slug.replace("/", "").split("/"),
    }));
}

export default async function PagePage({params}: PageProps) {
    const page = await getPageFromParams(params);

    if (!page) {
        notFound();
    }

    return (
        <article className="container max-w-3xl mx-auto py-6 lg:py-12 flex justify-center items-center">
            {/*<div className="space-y-4">*/}
            {/*    <h1 className="inline-block font-heading text-4xl lg:text-5xl">*/}
            {/*        {page.title}*/}
            {/*    </h1>*/}
            {/*    {page.description && (*/}
            {/*        <p className="text-xl text-muted-foreground">{page.description}</p>*/}
            {/*    )}*/}
            {/*</div>*/}
            <hr className="my-4"/>
            <Mdx code={page.body.code}/>
        </article>
    );
}