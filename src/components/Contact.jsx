import { Controller, useForm } from "react-hook-form";
import { Box, Button, TextField } from "@mui/material";
import {
  EmailOutlined,
  LocalPhoneOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import Grid from "@mui/material/Grid2";


const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const Contact = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_STATE,
  });
  return (
    <div className="bg-gray-100 px-22 py-12 px-[10%]">
      <div>
        <h1 className="mb-5 text-[40px] font-extrabold text-green-600">
          Lets get in Touch
        </h1>
        <p className="font13 mb-8">
          Please contact us and we will get back to you as soon as possible.
        </p>

        <Grid container spacing={3} className="mb-8">
          <Grid size={{ sm: 12, md: 4 }} className="flex">
            <Box className="py-5 pr-5">
              <LocalPhoneOutlined
                className="text-green-600"
                sx={{ fontSize: 40 }}
              />
            </Box>
            <Box>
              <p className="text-lg font-extrabold"> Phone:</p>
              <p> +61 (0)2 9639 4415 </p>
              <p> +61 450 468 622 (WhatsApp) </p>
            </Box>
          </Grid>

          <Grid size={{ sm: 12, md: 4 }} className="flex">
            <Box className="py-5 pr-5">
              <EmailOutlined className="text-green-600" sx={{ fontSize: 40 }} />
            </Box>
            <Box>
              <p className="text-lg font-extrabold"> Email:</p>
              <a
                href={`mailto:"edux.support@eduxgateway.com"`}
                className="custom-link"
              >
                hisabKitab@gmail.com
              </a>

              <br></br>

              <a
                href={`mailto:"edux.sales@eduxgateway.com"`}
                className="custom-link"
              >
                Hisab@gmail.com
              </a>
            </Box>
          </Grid>

          <Grid size={{ sm: 12, md: 4 }} className="flex">
            <Box className="py-5 pr-5">
              <LocationOnOutlined
                className="text-green-600"
                sx={{ fontSize: 40,}}
              />
            </Box>
            <Box>
              <p className="text-lg font-extrabold"> Address:</p>
              <p>27/2 O'Connell St., New Baneshwor,</p>
              <p> NSW, 2150, Kathmandu </p>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={6} display="flex">
          <Grid size={{ sm: 12, md: 6 }}>
            <Grid item xs={12} marginBottom={2}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Please provide a Name.",
                  maxLength: { value: 100, message: "Max 100 characters." },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Name"
                    placeholder="Enter name"
                    error={!!errors?.name}
                    helperText={errors?.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} marginBottom={2}>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Please provide Email Address.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Email"
                    placeholder="Enter email"
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item marginBottom={2}>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: "Please provide phone number.",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Phone"
                    placeholder="Enter phone"
                    error={!!errors?.phone}
                    helperText={errors?.phone?.message}
                    type="tel"
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} marginBottom={2}>
              <Controller
                name="subject"
                control={control}
                rules={{
                  required: "Please provide a Subject.",
                  maxLength: { value: 100, message: "Max 100 characters." },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    label="Subject"
                    placeholder="Enter Subject"
                    error={!!errors?.subject}
                    helperText={errors?.subject?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="message"
                control={control}
                rules={{
                  required: "Please provide a message.",
                  maxLength: { value: 100, message: "Max 100 characters." },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    placeholder="Enter Message"
                    error={!!errors?.message}
                    helperText={errors?.message?.message}
                  />
                )}
              />

              <Button
                variant="contained"
                color="success"
                size="large"
                style={{ color: "#FFFFFF" }}
                sx={{ mt: 3 }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
          <Grid item size={{ sm: 12, md: 6 }}>
            <Box>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.7301458785196!2d85.32724931128477!3d27.694734176090492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a35ae3bc27%3A0xe958e4fbbefbfc50!2sMADAN%20BHANDARI%20MEMORIAL%20COLLEGE!5e0!3m2!1sen!2snp!4v1739377960205!5m2!1sen!2snp"
                width="600"
                height="450"
              ></iframe>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Contact;
