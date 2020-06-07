import { IExperienceElement } from './IExperienceElement';
import { IExperienceEffect } from './IExperienceEffect';
import { IExperienceSynergy } from './IExperienceSynergy';

export interface IExperience
{
        title: string,
        explorer_weight: string,
        explorer_age: string,
        explorer_gender: string,
        set_before: string,
        set_expectations: string,
        setting_location: string,
        setting_weather: string,
        setting_atmosphere: string,
        setting_companions: string,
        setting_other: string,
        effects_physical: string,
        effects_emotional: string,
        effects_semantic: string,
        effects_meta_physical: string,
        experience_elements: IExperienceElement[],
        experience_synergies: IExperienceSynergy[],
        experience_effects: IExperienceEffect[],
        public: boolean
}