// import { Form, InputNumber, Input } from "antd";
// import React from "react";

// function useEditableCell<T>(record) {
//     interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//         editing: boolean;
//         dataIndex: string;
//         title: string;
//         inputType: 'number' | 'text';
//         record: T;
//         index: number;
//     }

//     const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
//         editing,
//         dataIndex,
//         title,
//         inputType,
//         record,
//         index,
//         children,
//         ...restProps
//     }) => {
//         const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

//         return (
//             <td {...restProps}>
//                 {editing ? (
//                     <Form.Item
//                         name={dataIndex}
//                         style={{ margin: 0 }}
//                         rules={[
//                             {
//                                 required: true,
//                                 message: `Please Input ${title}!`,
//                             },
//                         ]}
//                     >
//                         {inputNode}
//                     </Form.Item>
//                 ) : (
//                     children
//                 )}
//             </td>
//         );
//     };
// }
// export default useEditableCell;