import React, { useState, useEffect, useRef } from "react";
import { RiMenuFold2Line } from "react-icons/ri";
import "../../../App.css";
import { AddDevice, DeleteDevice } from "../../../utils/ENE_Api";

const ManageDevice = () => {
  const deviceInfo = JSON.parse(localStorage.getItem("userInfo"))?.devices;
  const [selectedSiteName, setSelectedSiteName] = useState(Object.keys(deviceInfo)?.[0]);
  const selectedDeviceIdRef = useRef();

  const [deviceId, setDeviceId] = useState(null);
  const [serialNumber, setSerialNumber] = useState(null);
  const [siteName, setSiteName] = useState(null);
  const [deviceLocatedPlace, setDeviceLocatedPlace] = useState(null);
  const [deviceLatitude, setDeviceLatitude] = useState(null);
  const [deviceLongitude, setDeviceLongitude] = useState(null);

  const DeleteDeviceHandler = () => {
    const deviceId = selectedDeviceIdRef.current.value;
    DeleteDevice(deviceId, selectedSiteName)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        alert(res?.msg.toUpperCase());
      });
  };
  const AddDeviceHandler = () => {
    AddDevice(deviceId, serialNumber, siteName, deviceLocatedPlace, deviceLatitude, deviceLongitude)
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        alert(res?.msg);
      });
  };

  console.log({ deviceInfo });

  return (
    <div className="flex flex-col gap-2 w-full   overflow-auto ">
      <div className="flex flex-col gap-5 w-full  min-h-[calc(100vh-40px)] rounded-3xl lg:border-2  border-base-100  bg-base-100 p-5 lg:px-10 py-5">
        {/* =============================== Header ======================================= */}

        <div className="flex w-full rounded-lg  items-center gap-5 justify-between ">
          <div className="flex gap-5">
            <label htmlFor="my-drawer-2" className="drawer-button lg:hidden text-xl">
              <RiMenuFold2Line />
            </label>
            <div className="flex flex-col">
              <h1 className="lg:text-4xl text-lg  text-base-content/40 ">Manage Device</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full h-full justify-center items-center gap-10">
          <div className="flex flex-col gap-5 rounded-2xl shadow-2xl p-10 w-full lg:w-1/3">
            <h1 className="text-2xl text-base-content/50 "> Add Device</h1>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Id</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md"
                value={deviceId}
                onChange={(event) => setDeviceId(event.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Serial Number</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md"
                value={serialNumber}
                onChange={(event) => setSerialNumber(event.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Alias / Site Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md"
                value={siteName}
                onChange={(event) => setSiteName(event.target.value)}
              />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Location</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md"
                value={deviceLocatedPlace}
                onChange={(event) => setDeviceLocatedPlace(event.target.value)}
              />
            </label>
            <div className="flex gap-5 w-full">
              <label className="form-control max-w-md w-1/2">
                <div className="label">
                  <span className="label-text">Enter Device Latitude</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  value={deviceLatitude}
                  onChange={(event) => setDeviceLatitude(event.target.value)}
                />
              </label>
              <label className="form-control max-w-md w-1/2">
                <div className="label">
                  <span className="label-text">Enter Device Longitude</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-md"
                  value={deviceLongitude}
                  onChange={(event) => setDeviceLongitude(event.target.value)}
                />
              </label>
            </div>

            <button className="btn btn-primary" onClick={AddDeviceHandler()}>
              Add
            </button>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl shadow-2xl p-10 w-full lg:w-1/3">
            <h1 className="text-2xl text-base-content/50 ">Delete Device</h1>

            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Select Device Alias / Site Name</span>
              </div>
              <select
                className="select select-bordered w-full max-w-md"
                value={selectedSiteName}
                onChange={(event) => setSelectedSiteName(event.target.value)}
              >
                {Object.keys(deviceInfo)?.map((device) => {
                  return <option key={device}>{device}</option>;
                })}
              </select>
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Select Device Id</span>
              </div>
              <select className="select select-bordered w-full max-w-md" ref={selectedDeviceIdRef}>
                {deviceInfo[selectedSiteName]?.map((device) => {
                  return <option key={device?.deviceId}>{device?.deviceId}</option>;
                })}
              </select>
            </label>

            <button className="btn btn-error" onClick={DeleteDeviceHandler}>
              DELETE
            </button>
          </div>
          {/* <div className="flex flex-col gap-5 rounded-2xl shadow-2xl p-10 w-full lg:w-1/3">
            <h1 className="text-2xl text-base-content/50 "> Add Device</h1>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Id</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Serial Number</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Alias</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
            </label>
            <label className="form-control w-full max-w-md">
              <div className="label">
                <span className="label-text">Enter Device Location</span>
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
            </label>
            <div className="flex gap-5 w-full">
              <label className="form-control max-w-md w-1/2">
                <div className="label">
                  <span className="label-text">Enter Device Latitude</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
              </label>
              <label className="form-control max-w-md w-1/2">
                <div className="label">
                  <span className="label-text">Enter Device Longitude</span>
                </div>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-md" />
              </label>
            </div>

            <button className="btn btn-primary">Add</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ManageDevice;
