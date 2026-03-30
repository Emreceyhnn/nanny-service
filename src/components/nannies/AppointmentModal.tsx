import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { Nanny } from "../../lib/type/nannies";
import { db } from "../../lib/firebase";
import { ref, push, serverTimestamp } from "firebase/database";
import { useAuth } from "../../hooks/useAuth";

const schema = yup.object().shape({
  address: yup.string().required("Address is required").min(5, "Address must be at least 5 characters").max(200, "Address too long"),
  phone: yup.string().required("Phone number is required").min(9, "Min 9 digits").max(15, "Max 15 digits"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Child age is required")
    .min(0, "Age cannot be negative")
    .max(18, "Max age is 18"),
  time: yup.mixed().required("Time is required"),
  email: yup.string().email("Invalid email").required("Email is required").min(5, "Email too short").max(100, "Email too long"),
  name: yup.string().required("Parent name is required").min(2, "Name too short").max(100, "Name too long"),
  comment: yup.string().max(1000, "Comment too long"),
});

interface AppointmentFormValues {
  address: string;
  phone: string;
  age: number;
  time: dayjs.Dayjs | null;
  email: string;
  name: string;
  comment?: string;
}

interface Props {
  nanny: Nanny;
  onClose: () => void;
}

const AppointmentModal: React.FC<Props> = ({ nanny, onClose }) => {
  const {
    state: { user },
  } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      time: null,
    },
  });

  const onSubmit = async (data: AppointmentFormValues) => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      const appointmentsRef = ref(db, "appointments");

      const formattedData = {
        ...data,
        time: dayjs(data.time).format("HH:mm"),
        nannyId: nanny.id,
        nannyName: nanny.name,
        nannyAvatar: nanny.avatar_url,
        userId: user.uid,
        createdAt: serverTimestamp(),
      };

      await push(appointmentsRef, formattedData);
      toast.success("Appointment requested successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "30px",
          p: { xs: 2, md: 4 },
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "text.secondary",
          }}
        >
          <Close />
        </IconButton>

        <DialogTitle component="div" sx={{ p: 0, mb: 2 }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 500, fontSize: "40px", mb: 1 }}
          >
            Make an appointment with a babysitter
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}
          >
            Arranging a meeting with a caregiver for your child is the first
            step to creating a safe and comfortable environment. Fill out the
            form below so we can match you with the perfect care partner.
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 0, mt: 3 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 4 }}>
            <Avatar
              src={nanny.avatar_url}
              variant="rounded"
              sx={{ width: 44, height: 44, borderRadius: "12px" }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{ color: "rgba(0,0,0,0.5)", display: "block" }}
              >
                Your nanny
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {nanny.name}
              </Typography>
            </Box>
          </Box>

          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <form onSubmit={handleSubmit(onSubmit as any)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  placeholder="Address"
                  {...register("address")}
                  inputProps={{ minLength: 5, maxLength: 200 }}
                  error={!!errors.address}
                  helperText={errors.address?.message as string}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  placeholder="+380"
                  {...register("phone")}
                  inputProps={{ minLength: 9, maxLength: 15 }}
                  error={!!errors.phone}
                  helperText={errors.phone?.message as string}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Child's age"
                  {...register("age")}
                  inputProps={{ min: 0, max: 18 }}
                  error={!!errors.age}
                  helperText={errors.age?.message as string}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      ampm={false}
                      sx={{ width: "100%" }}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.time,
                          helperText: errors.time?.message as string,
                        },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={12}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  {...register("email")}
                  inputProps={{ minLength: 5, maxLength: 100 }}
                  error={!!errors.email}
                  helperText={errors.email?.message as string}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  placeholder="Father's or mother's name"
                  {...register("name")}
                  inputProps={{ minLength: 2, maxLength: 100 }}
                  error={!!errors.name}
                  helperText={errors.name?.message as string}
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Comment"
                  {...register("comment")}
                  inputProps={{ maxLength: 1000 }}
                />
              </Grid>

              <Grid size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.main", opacity: 0.9 },
                  }}
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AppointmentModal;
