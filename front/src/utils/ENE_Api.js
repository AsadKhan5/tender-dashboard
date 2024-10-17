import { postData, getData } from "./common";
import { getAuthToken } from "./auth";

const BASE_URL = "http://localhost:8000/";

export const LoginUser = async (email, password) => {
  try {
    return postData(`${BASE_URL}auth/login`, { email, password });
  } catch (er) {
    console.log("ENE_API [LOGIN]: ", er);
  }
};

export const SignupUser = async (email, password) => {
  try {
    return postData(`${BASE_URL}user/register`, {
      email,
      password,
    });
  } catch (er) {
    console.log("ENE_API [REGISTER]: ", er);
  }
};

export const AddDevice = async (
  deviceId,
  serialNo,
  alias,
  locationName,
  latitude,
  longitude
) => {
  const token = getAuthToken();

  console.log({ deviceId, serialNo, alias, locationName, latitude, longitude });
  try {
    return postData(
      `${BASE_URL}user/device/${deviceId}`,
      {
        serialNumber: serialNo,
        siteName: alias || "Device",
        location: {
          latitude: latitude || "27.88",
          longitude: longitude || "98.08",
          address: locationName || "aligarh",
        },
      },
      token
    );
  } catch (er) {
    console.log("ENE_API [ADD DEVICE]: ", er);
  }
};
export const DeleteDevice = async (deviceId, alias) => {
  const token = getAuthToken();

  console.log({ deviceId, alias });
  try {
    return postData(
      `${BASE_URL}user/device/${deviceId}`,
      {
        siteName: alias || "Device",
      },
      token
    );
  } catch (er) {
    console.log("ENE_API [ADD DEVICE]: ", er);
  }
};

export const GetDevices = async () => {
  const token = getAuthToken();
  try {
    return getData(`${BASE_URL}user/device`, token);
  } catch (er) {
    console.log("ENE_API [ADD DEVICE]: ", er);
  }
};

export const GetDeviceData = async (deviceId) => {
  const token = getAuthToken();
  try {
    return getData(`${BASE_URL}device/getData/${deviceId}`, token);
  } catch (er) {
    console.log("ENE_API [ADD DEVICE]: ", er);
  }
};

export const updateUser = async (name, address, contact, firm_name) => {
  const token = getAuthToken();

  console.log({ firm_name, contact, address, name });

  let commingData = {
    name,
    address,
    contact,
    firm_name,
  };

  let data = Object.entries(commingData)
    .map((obj) => {
      if (obj[1] !== "") {
        return { [obj[0]]: obj[1] };
      }
    })
    .filter((item) => item);
  console.log(data);

  let sendData = {};
  for (let prop of data) {
    let key = Object.keys(prop)[0];
    let value = Object.values(prop)[0];
    sendData = { ...sendData, [key]: value };
  }

  console.log(sendData);

  try {
    return postData(
      `${BASE_URL}user/details`,
      {
        ...sendData,
      },
      token
    );
  } catch (er) {
    console.log("ENE_API [UPDATE USER]: ", er);
  }
};

export const publishApi = (deviceId, process, action, industry) => {
  const token = getAuthToken();
  try {
    return postData(
      `${TANK_ACTION_URL}/publish`,
      { deviceId, process, action, industry },
      token
    );
  } catch (er) {
    console.log("ENE_API [PUBLISH]: ", er);
  }
};

export const getAllState = (deviceId, process, limit) => {
  const token = getAuthToken();
  try {
    return getData(
      `${TANK_ACTION_URL}/all-state?deviceId=${deviceId}&limit=${limit}&process=${process}`,
      token
    );
  } catch (er) {
    console.log("ENE_API [PUBLISH]: ", er);
  }
};

export const getPreviousTankState = (deviceId) => {
  const token = getAuthToken();
  try {
    return getData(
      `${TANK_ACTION_URL}/last-status?deviceId=${deviceId}`,
      token
    );
  } catch (er) {
    console.log("ENE_API [PREVIOUS TANK STATE]: ", er);
  }
};
