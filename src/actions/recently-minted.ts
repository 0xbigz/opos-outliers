"use server";

const {
    RPC_URL = "",
} = process.env;

import { Item } from "@/types";

import { config } from "@/config";

const isDefault = (attributes: {
    trait_type: string,
    value: string,
}[]) => {
    let matches = 0;

    for (const { value, trait_type } of attributes) {
        if (value === config.defaultAttributes[trait_type]) {
            matches++;
        }
    }

    return matches === attributes.length;
}

export async function getRecentlyMinted(page = 1) {
    const response = await fetch(RPC_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "string",
            "method": "searchAssets",
            "params": {
                grouping: ["collection", "4L8TbnM8UwobHBAkJZoU5qzexN6WVUWeEKC72TxkBJ4b"],
                page,
                "limit": 100,
                "compressed": true,
                "sortBy": {
                    "sortBy": "updated",
                    "sortDirection": "desc"
                },
            }
        })
    }).then((response) => response.json()).catch((error) => console.log(error)) || {};

    // @ts-ignore
    const formatted = response.result.items.map((item) => {
        const [
            image,
            secondaryImage,
        ] = item?.content?.files;

        return {
            image: image.cdn_uri,
            secondaryImage: secondaryImage?.cdn_uri,
            name: item?.content?.metadata?.name,
            attributes: item?.content?.metadata?.attributes,
            description: item?.content?.metadata?.description,
            id: item?.id
        }
    }).filter((item: any) => !isDefault(item.attributes));

    return formatted as Item[];
}