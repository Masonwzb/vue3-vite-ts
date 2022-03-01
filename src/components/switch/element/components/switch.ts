import {
    buildProps,
    isBoolean,
    isNumber,
    isString,
} from '../utils'
import {
    UPDATE_MODEL_EVENT,
    INPUT_EVENT,
    CHANGE_EVENT
} from "../constants"
import type { ExtractPropTypes, PropType } from 'vue'

export const switchProps = buildProps({
    id: String,
    modelValue: {
        type: [Boolean, String, Number],
        default: false,
    },
    value: {
        type: [Boolean, String, Number],
        default: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    width: {
        type: Number,
        default: 40,
    },
    name: {
        type: String,
        default: '',
    },
    activeValue: {
        type: [Boolean, String, Number],
        default: true,
    },
    inactiveValue: {
        type: [Boolean, String, Number],
        default: false,
    },
} as const)

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
    [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
        isBoolean(val) || isString(val) || isNumber(val),
    [CHANGE_EVENT]: (val: boolean | string | number) =>
        isBoolean(val) || isString(val) || isNumber(val),
    [INPUT_EVENT]: (val: boolean | string | number) =>
        isBoolean(val) || isString(val) || isNumber(val),
}
export type SwitchEmits = typeof switchEmits
