
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UsersTab from "@/components/admin/UsersTab";
import AdminToolbar from "@/components/admin/AdminToolbar";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Users } from "lucide-react";

const AdminUsers: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <AdminLayout>
      <AdminToolbar />
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
          <Users className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-bold">{t("admin.manage_users")}</h1>
      </motion.div>
      <Separator className="mb-6" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <UsersTab />
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUsers;
