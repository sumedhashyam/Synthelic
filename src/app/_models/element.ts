import { IElementName } from './IElementName';
import { BaseElement } from './baseElement';

export class Element
{
    id: number;
    image: string;
    common_name: string;
    scientific_name: string;
    element_names: IElementName[];
    element_sources: BaseElement[];
    element_effects: BaseElement[];
    element_applications: BaseElement[];
}