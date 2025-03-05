import { useDisclosure } from "@mantine/hooks";
import { Drawer } from "@mantine/core";
import Badge from "@mui/material/Badge";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotification = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://localhost:7287/api/LowStockNotification`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  return (
    <>
     
      <Badge badgeContent={notifications.length} color="primary">
        <IoNotifications
          onClick={open}
          className="text-gray-300 cursor-pointer hover:text-gray-400 transition-all"
          size={30}
        />
      </Badge>

      
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title="Notifications"
        size="md"
      >
        <div className="p-4 space-y-4">
          {loading ? (
            <Loader />
          ) : notifications.length > 0 ? (
            notifications.map((notif, index) => {
              const [mainMessage, reorderText] = notif.message.split("; ");

              return (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white border-l-4 border-red-500 rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  
                  <div className="text-red-500 text-xl">
                    <IoNotifications />
                  </div>

                
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">
                      Stock Alert
                    </h4>
                    <p className="text-sm text-red-500 ">{mainMessage}</p>
                    {reorderText && (
                      <p className="text-sm text-gray-600 font-semibold">
                        {reorderText}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notif.sendDate).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-10">
              <IoNotifications size={50} className="mx-auto text-gray-300" />
              <p className="mt-2 text-sm">No new notifications</p>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Notification;
