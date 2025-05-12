import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function FilterAccordionContainer({ label, children }) {
    return (
        <AccordionItem value={label} className="border-b-2 border-bg-300">
            <AccordionTrigger className="font-semibold text-lg capitalize">
                {label}
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
    );
}

export default FilterAccordionContainer;
