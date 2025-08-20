const IMAGE_URL: string = import.meta.env.VITE_IMG_PRODUCT as string

export function productUrl(path: string): string {
    return `${IMAGE_URL}/${path}`
}
