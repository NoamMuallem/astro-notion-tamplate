import { cn } from "../utils/cn"

export const PostPreview = ({
    title,
    slug,
    image,
    description,
}: {
    title: string,
    slug: string,
    image: string,
    description: string,
}) => {
    return (
        <li className={cn(
            "card", "w-fit hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
        )}>
            <a href={`/blog/${slug}`}>
                <img src={image} alt={title} />
                <h2>{title}</h2>
                <p>{description}</p>
            </a>
        </li>
    )
}
