import SelectBox from "@/app/_components/shared/SelectBox";

function RegionalPreference({ label, form, items, name }) {
    return (
        <div className="grid grid-cols-3 items-center gap-4">
            <p className="font-medium">{label}</p>
            <SelectBox
                form={form}
                name={name}
                items={items}
                className="col-span-2"
            />
        </div>
    );
}

export default RegionalPreference;
