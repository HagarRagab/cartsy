function Info({ title, info }) {
    return (
        <li>
            <span className="text-text-400 capitalize">{title}:</span>
            <span className="font-semibold ml-2">{info}</span>
        </li>
    );
}

export default Info;
