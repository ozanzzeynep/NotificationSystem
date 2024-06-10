import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { authenticationItems } from "../../store/initialValues/authenticationItems";

import { useFormik } from "formik";
import './Login.css'
import Image from "../register/Picture1.png";
import { loginValidation } from "./../login/loginValidation";
import Register from "../register/Register";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../components/hooks/hooks";
import { useSelector } from "react-redux";
import { loginUser } from "../../store/slices/userSlice";

const Login = () => {

  const {loading, error} = useSelector((state:any) => state.user);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: authenticationItems,
    validationSchema: loginValidation,
    onSubmit: async (values, {resetForm}) => {
      
      try {
        const response = await dispatch(loginUser(values))
        if(loginUser.fulfilled.match(response)){
          navigate('/system');
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="form-button"
                style={{ backgroundColor: 'rgb(95, 81, 81)' }}
              >
                {loading ? 'Loading....' : 'Sign In'}
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/register" onClick={() => <Register />}>
                    Don't have an account? Sign Up
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

export default Login;
