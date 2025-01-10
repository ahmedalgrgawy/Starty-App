"use client"

import { XIcon } from "lucide-react"
import Link from "next/link"

const SearchFormReset = () => {

    const reset = () => {
        const form = document.querySelector("form") as HTMLFormElement
        if (form) {
            form.reset()
        }
    }

    return (
        <button type="reset" onClick={reset} className="search-btn">
            <Link href="/" className="search-btn text-white">
                <XIcon className="size-5" />
            </Link>
        </button>
    )
}

export default SearchFormReset