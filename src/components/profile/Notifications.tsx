
import React, { useState, useEffect } from "react";
import { getNotifications, markNotificationAsRead, Notification } from "../../services/profileService";
import { Button } from "../ui/button";
import { Bell, CheckCircle, Loader2 } from "lucide-react";
import TranslateText from "../TranslateText";
import { formatDistanceToNow } from "date-fns";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const success = await markNotificationAsRead(id);
    if (success) {
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, is_read: true } : notification
      ));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-10">
        <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium"><TranslateText text="No Notifications" /></h3>
        <p className="text-muted-foreground"><TranslateText text="You don't have any notifications yet" /></p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold"><TranslateText text="Notifications" /></h2>
      
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 rounded-lg border ${notification.is_read ? 'bg-background' : 'bg-primary/5 border-primary/20'}`}
          >
            <div className="flex justify-between">
              <h3 className="font-medium">{notification.title}</h3>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
              </span>
            </div>
            
            <p className="mt-1 text-sm">{notification.message}</p>
            
            {!notification.is_read && (
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <CheckCircle className="mr-1 h-4 w-4" />
                <TranslateText text="Mark as read" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
