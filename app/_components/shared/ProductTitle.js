import Link from "next/link";

function ProductTitle({ productLink, title }) {
    return (
        <Link
            href={productLink}
            className="whitespace-nowrap text-ellipsis font-bold"
        >
            {title}
        </Link>
    );
}

export default ProductTitle;
