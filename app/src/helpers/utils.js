import { message } from "antd";
// eslint-disable-next-line import/prefer-default-export
const appEndPoint = process.env.REACT_APP_ENDPOINT;

export const getLocalStorage = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export const allowPdf = (file) => {
  if (file.type !== 'application/pdf') {
    message.error('You can only upload PDF file!');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 10;
  if (!isLt2M) {
    message.error('File must smaller than 10MB!');
    return false;
  }
  return true;
}

export const statusColor = (status) => {
  switch (status) {
    case "Draft":
      return "blue"
    case "Publish":
      return "green";
    case "Live":
      return "purple";
    default:
      return "red";
  }
};


export const priorityColor = (status) => {
  switch (status) {
    case "High":
      return "red"
    case "Medium":
      return "green";
    case "Low":
      return "purple";
  }
};

export const templateTypesColor = (status) => {
  switch (status) {
    case "Meeting Notice":
      return "blue"
    case "Agenda Resolved":
      return "green";
    case "Meeting Minutes":
      return "purple";
  }
};

export const getFileUrl = (url) => {
  if (!url) return "";
  if (url.search("https") !== 0) {
    return url ? `${appEndPoint}/${url}` : "";
  } else return url;
}