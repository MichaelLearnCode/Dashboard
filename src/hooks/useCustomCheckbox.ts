import { useState } from "react";
import { CheckboxProps } from "antd";

function useCustomCheckbox<T>({dataOptions}:{dataOptions: T[]}) {
    const [checkedList, setCheckedList] = useState<T[]>([]);
    const checkAll = dataOptions.length === checkedList.length;
    const indeterminate = checkedList.length > 0 && checkedList.length < dataOptions.length;
    const onCheckedAllChange: CheckboxProps['onChange'] = (e) => {
        setCheckedList(e.target.checked ? dataOptions : []);
    }
    const addCheck = (id: T) => {
        const newCheckedList = [...checkedList];
        newCheckedList.push(id);
        setCheckedList(newCheckedList);
    }
    const removeCheck = (id: T) => {
        const newCheckedList = [...checkedList].filter(checkid => checkid !== id);
        setCheckedList(newCheckedList);
    }

    const onCheckedChange = (id: T) => {
        const isChecked = checkedList.find(checkid => checkid === id);
        if (isChecked) removeCheck(id)
        else addCheck(id);
    }

    return {checkedList, indeterminate, checkAll, onCheckedAllChange, onCheckedChange}
}

export default useCustomCheckbox;