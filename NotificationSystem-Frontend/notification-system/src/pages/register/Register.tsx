import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  CssBaseline,
  Switch as MuiSwitch,
  Paper,
} from "@mui/material";
import Image from "./Picture1.png"; // Resminizin yolu
import "./Register.css";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import { registerItems } from "../../store/initialValues/registerItems";
import Login from "../login/Login";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../components/hooks/hooks";
import { useSelector } from "react-redux";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: registerItems,
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(response)) {
          navigate("/");
        }
      } catch (e) {
        console.error("Failed", e);
      }
    },
  });
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper elevation={6} className="main-container">
        <Grid container>
          <Grid item xs={12} className="form-header">
            <Typography component="h1" variant="h3">
              Notification Portal
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} className="form-container">
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              noValidate
              className="form-box"
            >
              <TextField
                margin="normal"
                fullWidth
                id="nameSurname"
                label="Name Surname"
                name="nameSurname"
                autoComplete="nameSurname"
                autoFocus
                value={formik.values.nameSurname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.nameSurname &&
                  Boolean(formik.errors.nameSurname)
                }
                helperText={
                  formik.touched.nameSurname && formik.errors.nameSurname
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formik.values.confirmPassword || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="form-button"
                style={{ backgroundColor: 'rgb(95, 81, 81)' }}
              >
                {loading ? "Signing Up...." : "Sing Up"}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/" onClick={() => <Login />}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} className="hidden-xs">
            <img src={Image} alt="Login/Register" className="form-img" />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Register;
