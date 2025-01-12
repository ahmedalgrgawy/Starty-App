"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "@/lib/utils"
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export const createStartup = async (
    state: any,
    form: FormData,
    pitch: string
) => {

    const session = await auth()

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    const { title, descriptions, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    );

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const startup = {
            title,
            descriptions,
            category,
            image: link,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            },
            pitch
        }

        const newStartup = await writeClient.create({ _type: "startup", ...startup })

        return parseServerActionResponse({
            ...newStartup,
            error: "",
            status: "SUCCESS"
        })

    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        });
    }

}