// "use client";
// import React from "react";
// import { Button, Form, Input, DatePicker, Select, Upload, message } from "antd";
// import { UploadOutlined } from '@ant-design/icons';
// import { useState } from "react";
// import { RcFile } from "antd/es/upload/interface";
// import Logo from "../../../../public/logo-sign.png";
// import Image from "next/image";
// // import type { GetProp, UploadFile, UploadProps } from 'antd';
// import Link from "next/link";
//
// // type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
//
//
//
// interface AgentProfileFormValues {
//     full_name: string;
//     email?: string;
//     date_of_birth: string;
//     phone_number: string;
//     nationality: string;
//     nid_number: string;
//     telegram_account: string;
//     verification_type: string;
//     front_side_document?: RcFile;
//     back_side_document?: RcFile;
// }
//
// const COUNTRIES = [
//     { label: 'Bangladesh', value: 'Bangladesh' },
//     { label: 'India', value: 'India' },
//     // Add more countries as needed
// ];
//
// const VERIFICATION_TYPE = [
//     { label: 'NID', value: 'nid' },
//     { label: 'Passport', value: 'passport' },
//     { label: 'Driving License', value: 'driving_license' },
//     // Add more types as needed
// ];
//
// const ProfileForm: React.FC = () => {
//     // const router = useRouter();
//     // const [fileList, setFileList] = useState<UploadFile[]>([]);
//   // const [uploading, setUploading] = useState(false);
//
//   // const handleUpload = () => {
//   //   const formData = new FormData();
//   //   fileList.forEach((file) => {
//   //     formData.append('files[]', file as FileType);
//   //   });
//   //   setUploading(true);
//   //   // You can use any AJAX library you like
//   //   fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
//   //     method: 'POST',
//   //     body: formData,
//   //   })
//   //     .then((res) => res.json())
//   //     .then(() => {
//   //       setFileList([]);
//   //       message.success('upload successfully.');
//   //     })
//   //     .catch(() => {
//   //       message.error('upload failed.');
//   //     })
//   //     .finally(() => {
//   //       setUploading(false);
//   //     });
//   // };
//
//   // const props: UploadProps = {
//   //   onRemove: (file) => {
//   //     const index = fileList.indexOf(file);
//   //     const newFileList = fileList.slice();
//   //     newFileList.splice(index, 1);
//   //     setFileList(newFileList);
//   //   },
//   //   beforeUpload: (file) => {
//   //     setFileList([...fileList, file]);
//   //
//   //     return false;
//   //   },
//   //   fileList,
//   // };
//
//     const [frontSideFile, setFrontSideFile] = useState<RcFile | null>(null);
//     const [backSideFile, setBackSideFile] = useState<RcFile | null>(null);
//     const [photoDocumentFile, setPhotoDocumentFile] = useState<RcFile | null>(null);
//
//     const handleFileChange = (info: any, setFile: (file: RcFile | null) => void) => {
//         if (info.file.status === 'done') {
//             setFile(info.file.originFileObj);
//         }
//         console.log(info.file.originFileObj);
//     };
//
//     const formatDate = (date: Date): string => {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');  // Months are zero-indexed, so add 1
//         const day = String(date.getDate()).padStart(2, '0');  // Pad single digits with a leading zero
//         console.log(`${year}-${month}-${day}`)
//         return `${year}-${month}-${day}`;
//     };
//
//     const handleSubmit = async (values: AgentProfileFormValues) => {
//     // const token = getCookie("ac_t"); // You need to fetch the actual token, maybe from local storage or context
//         const formattedDate = formatDate(new Date(values.date_of_birth));
//
//     // Collect form data and file uploads
//     // const formData = {
//     //     full_name: values.full_name,
//     //     email: values.email || '',
//     //     date_of_birth: formattedDate,
//     //     phone_number: values.phone_number,
//     //     nationality: values.nationality,
//     //     nid_number: values.nid_number,
//     //     telegram_account: values.telegram_account,
//     //     verification_type: values.verification_type,
//     //     front_side_document: frontSideFile, // File from state
//     //     back_side_document: backSideFile, // File from state
//     //     photo_document: photoDocumentFile
//     // };
//
//     // Call the uploadAgentProfile function to submit the form data
//     // const result = await uploadAgentProfile(formData, token);
//
//     // if (result.error) {
//     //     console.error('Upload failed:', result.error);
//     //     message.error('Failed to submit the form. Please try again.');
//     // } else {
//     //     message.success('Profile created successfully!');
//     //     router.push('/'); // Redirect after success
//     // }
// };
//
//
//     return (
//       <div className="p-4 shadow-md rounded-2xl w-[600px] m-8 bg-cover bg-center bg-no-repeat bg-white">
//         <div className="flex flex-col items-center justify-center gap-4 mb-4">
//             <div className="flex items-center justify-center">
//                 <Image src={Logo} alt="Logo" className="h-1/3 w-1/3" />
//             </div>
//             <h1 className="text-center text-2xl font-semibold" style={{ lineHeight: "1" }}>
//                 Profile Setup
//             </h1>
//             <p className="text-center" style={{ fontSize: "11px", lineHeight: "1.5" }}>
//                 Enter Your Personal Details
//             </p>
//         </div>
//
//           <Form onFinish={handleSubmit} layout="vertical">
//               <div className="flex gap-2">
//                   <Form.Item
//                     name="full_name"
//                     label="Full Name"
//                     rules={[{ required: true, message: "Please input your full name!" }]}
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Input />
//                   </Form.Item>
//
//                   <Form.Item
//                     name="email"
//                     label="Email"
//                     rules={[
//                         { type: "email", message: "The input is not valid E-mail!" },
//                         { required: false }
//                     ]}
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Input />
//                   </Form.Item>
//               </div>
//
//               <div className="flex gap-2">
//                   <Form.Item
//                     name="date_of_birth"
//                     label="Date of Birth"
//                     rules={[{ required: true, message: "Please input your date of birth!" }]}
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
//                   </Form.Item>
//
//                   <Form.Item
//                     name="phone_number"
//                     label="Phone Number"
//                     rules={[{ required: true, message: "Please input your phone number!" }]}
//                     className="flex-grow"
//                     initialValue="+8801888888888"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Input />
//                   </Form.Item>
//               </div>
//
//               <div className="flex gap-2">
//                   <Form.Item
//                     name="nationality"
//                     label="Nationality"
//                     rules={[{ required: true, message: "Please select your nationality!" }]}
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Select options={COUNTRIES} style={{ width: "100%" }} />
//                   </Form.Item>
//
//                   <Form.Item
//                     name="nid_number"
//                     label="NID Number"
//                     rules={[
//                         { required: true, message: "Please input your NID number!" },
//                         { len: 10, message: "NID number must be 10 characters long at least!" }
//                     ]}
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Input />
//                   </Form.Item>
//               </div>
//
//               <div className="flex gap-2">
//                   <Form.Item
//                     name="telegram_account"
//                     label="Telegram Account"
//                     rules={[{ required: true, message: "Please input your Telegram account!" }]}
//                     style={{ width: "50%" }}
//                   >
//                       <Input />
//                   </Form.Item>
//
//                   <Form.Item
//                     name="verification_type"
//                     label="Verification Type"
//                     rules={[{ required: true, message: "Please select your verification type!" }]}
//                     style={{ width: "50%" }}
//                   >
//                       <Select options={VERIFICATION_TYPE} style={{ width: "100%" }} />
//                   </Form.Item>
//               </div>
//
//               <div className="flex gap-2">
//                   <Form.Item
//                     name="front_side_document"
//                     label="Front Side Document"
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Upload
//                         beforeUpload={() => false}
//                         value={file}
//                         onChange={(info) => handleFileChange(info, setFrontSideFile)}
//                       >
//                           <Button icon={<UploadOutlined />}>Click to upload front side document</Button>
//                       </Upload>
//                   </Form.Item>
//
//                   <Form.Item
//                     name="back_side_document"
//                     label="Back Side Document"
//                     className="flex-grow"
//                     style={{
//                         width: "50%"
//                     }}
//                   >
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={(info) => handleFileChange(info, setBackSideFile)}
//                         accept={""}
//                       >
//                           <Button icon={<UploadOutlined />}>Click to upload back side document</Button>
//                       </Upload>
//                   </Form.Item>
//               </div>
//
//               <div className="flex">
//                   <Form.Item
//                     name="photo_document"
//                     label="Photo Document"
//                     className="flex-grow"
//                     style={{
//                         width: "100%"
//                     }}
//                   >
//                       <Upload
//                         beforeUpload={() => false}
//                         onChange={(info) => handleFileChange(info, setPhotoDocumentFile)}
//                         accept={""}
//                         style={{
//                           width: "100%"
//                         }}
//                       >
//                           <Button icon={<UploadOutlined />}>Click to upload photo document</Button>
//                       </Upload>
//                   </Form.Item>
//               </div>
//
//               <Form.Item>
//                   <Button style={{
//                       backgroundColor: "#ff4d00",
//                       width: "100%"
//                   }} type="primary" htmlType="submit">
//                       Submit
//                   </Button>
//               </Form.Item>
//           </Form>
//           <Link href={'/'}>Skip</Link>
//       </div>
// );
// };
//
// export default ProfileForm;
