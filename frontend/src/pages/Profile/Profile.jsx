import { useEffect, useRef, useState } from "react";



import {

  Avatar,

  Box,

  Button,

  Card,

  CardContent,

  Divider,

  IconButton,

  LinearProgress,

  TextField,

  Typography,

} from "@mui/material";



import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";

import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";

import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";



import useTasks from "../../hooks/useTasks";
import UserService from "../../services/UserService";



// ==========================================

// EMPTY PROFILE

const EMPTY_PROFILE = {
  name: "",
  email: "",
  phone: "",
  occupation: "",
  bio: "",
  profileImage: "",
  role: "",
  username: "",
  memberSince: "",
};

// ==========================================

// PROFILE PAGE

// ==========================================



const Profile = () => {

  const {

    totalTasks,

    completedTasks,

    progress,

  } = useTasks();



  const [profile, setProfile] =
    useState(EMPTY_PROFILE);

  const [originalProfile, setOriginalProfile] =
    useState(EMPTY_PROFILE);

  const [editMode, setEditMode] =
    useState(false);

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [savingProfile, setSavingProfile] =
    useState(false);

  const [profileError, setProfileError] =
    useState("");

  const fileInputRef =
    useRef(null);



  // ==========================================

  // LOAD PROFILE FROM BACKEND

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setProfileError("");

        const data =
          await UserService.getCurrentUser();

        const backendProfile = {
          name: data.name || data.username || "",
          email: data.email || "",
          phone: data.phone || "",
          occupation: data.occupation || "",
          bio: data.bio || "",
          profileImage: data.profileImage || "",
          role: data.role || "",
          username: data.username || "",
          memberSince: data.memberSince || "",
        };

        setProfile(backendProfile);
        setOriginalProfile(backendProfile);
      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );

        setProfileError(
          error.message ||
            "Unable to load profile."
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

// ==========================================

// HANDLE INPUT CHANGE

  // ==========================================



  const handleChange = (event) => {

    const { name, value } =

      event.target;



    setProfile((previous) => ({

      ...previous,

      [name]: value,

    }));

  };



  // ==========================================

  // IMAGE UPLOAD

  // ==========================================



  const handleImageUpload = (

    event

  ) => {

    const file =

      event.target.files?.[0];



    if (!file) {

      return;

    }



    if (!file.type.startsWith("image/")) {

      return;

    }



    if (file.size > 2 * 1024 * 1024) {

      alert(

        "Please select an image smaller than 2 MB."

      );



      event.target.value = "";



      return;

    }



    const reader =

      new FileReader();



    reader.onload = () => {

      setProfile((previous) => ({

        ...previous,

        profileImage:

          reader.result,

      }));

    };



    reader.readAsDataURL(file);



    event.target.value = "";

  };



  // ==========================================

  // CHOOSE PROFILE IMAGE

  // ==========================================



  const handleChooseImage = () => {

    fileInputRef.current?.click();

  };



  // ==========================================

  // REMOVE PROFILE IMAGE

  // ==========================================



  const handleRemoveImage = () => {

    setProfile((previous) => ({

      ...previous,

      profileImage: "",

    }));

  };



  // ==========================================

  // SAVE PROFILE

  // ==========================================



  const handleSave = async () => {
    try {
      setSavingProfile(true);
      setProfileError("");

      const updatedProfile =
        await UserService.updateProfile(profile);

      const backendProfile = {
        name:
          updatedProfile.name ||
          updatedProfile.username ||
          "",
        email: updatedProfile.email || "",
        phone: updatedProfile.phone || "",
        occupation:
          updatedProfile.occupation || "",
        bio: updatedProfile.bio || "",
        profileImage:
          updatedProfile.profileImage || "",
        role: updatedProfile.role || "",
        username:
          updatedProfile.username || "",
        memberSince:
          updatedProfile.memberSince || "",
      };

      setProfile(backendProfile);
      setOriginalProfile(backendProfile);
      setEditMode(false);
    } catch (error) {
      console.error(
        "Failed to save profile:",
        error
      );

      setProfileError(
        error.message ||
          "Unable to save profile."
      );
    } finally {
      setSavingProfile(false);
    }
  };



  // ==========================================

  // CANCEL EDIT

  // ==========================================



  const handleCancel = () => {
    setProfile(originalProfile);
    setEditMode(false);
    setProfileError("");
  };



  // ==========================================

  // AVATAR LETTER

  // ==========================================



  const avatarLetter =

    profile.name?.trim()

      ? profile.name

          .trim()

          .charAt(0)

          .toUpperCase()

      : "U";



  // ==========================================

  // MEMBER SINCE

  // ==========================================



  const memberSince = profile.memberSince
    ? new Date(
        profile.memberSince
      ).toLocaleDateString(
        "en-IN",
        {
          month: "long",
          year: "numeric",
        }
      )
    : "N/A";



  // ==========================================

  // UI

  // ==========================================



  return (

    <Box

      sx={{

        width: "100%",



        maxWidth: 1400,



        mx: "auto",

      }}

    >

      {/* ====================================== */}

      {/* PAGE HEADER */}

      {/* ====================================== */}



      <Box

        sx={{

          mb: 3,

        }}

      >

        <Typography

          component="h1"

          sx={{

            fontSize: {

              xs: "24px",

              sm: "28px",

            },



            fontWeight: 700,



            lineHeight: 1.2,



            letterSpacing:

              "-0.02em",



            color:

              "text.primary",

          }}

        >

          Profile

        </Typography>



        <Typography

          sx={{

            mt: 0.6,



            fontSize: "12px",



            color:

              "text.secondary",



            lineHeight: 1.5,

          }}

        >

          Manage your personal

          information and

          productivity overview.

        </Typography>

      </Box>



      {/* ====================================== */}

      {/* PROFILE HERO */}

      {/* ====================================== */}



      <Card

        sx={{

          position: "relative",



          overflow: "hidden",



          border: "1px solid",



          borderColor:

            "divider",



          borderRadius: 1.5,



          boxShadow: "none",



          mb: 2,

        }}

      >

        {/* TOP ACCENT */}



        <Box

          sx={{

            position: "absolute",



            top: 0,



            left: 0,



            right: 0,



            height: 3,



            backgroundColor:

              "primary.main",

          }}

        />



        <CardContent

          sx={{

            p: {

              xs: 2,

              sm: 2.5,

              md: 3,

            },



            "&:last-child": {

              pb: {

                xs: 2,

                sm: 2.5,

                md: 3,

              },

            },

          }}

        >

          <Box

            sx={{

              display: "flex",



              alignItems: {

                xs: "flex-start",

                md: "center",

              },



              justifyContent:

                "space-between",



              gap: 3,



              flexDirection: {

                xs: "column",

                md: "row",

              },

            }}

          >

            {/* ================================= */}

            {/* USER INFORMATION */}

            {/* ================================= */}



            <Box

              sx={{

                display: "flex",



                alignItems: "center",



                gap: 2,



                minWidth: 0,



                width: {

                  xs: "100%",

                  md: "auto",

                },

              }}

            >

              {/* AVATAR */}



              <Box

                sx={{

                  position:

                    "relative",



                  flexShrink: 0,

                }}

              >

                <Avatar

                  src={

                    profile.profileImage ||

                    undefined

                  }

                  alt={

                    profile.name ||

                    "Profile"

                  }

                  sx={{

                    width: {

                      xs: 64,

                      sm: 76,

                    },



                    height: {

                      xs: 64,

                      sm: 76,

                    },



                    bgcolor:

                      "primary.main",



                    fontSize: {

                      xs: "1.5rem",

                      sm: "1.8rem",

                    },



                    fontWeight: 700,

                  }}

                >

                  {!profile.profileImage &&

                    avatarLetter}

                </Avatar>



                {/* CAMERA BUTTON */}



                {editMode && (

                  <IconButton

                    size="small"

                    onClick={

                      handleChooseImage

                    }

                    aria-label="Change profile picture"

                    sx={{

                      position:

                        "absolute",



                      right: -5,



                      bottom: -5,



                      width: 30,



                      height: 30,



                      backgroundColor:

                        "background.paper",



                      border: "1px solid",



                      borderColor:

                        "divider",



                      boxShadow: 1,



                      "&:hover": {

                        backgroundColor:

                          "action.hover",

                      },

                    }}

                  >

                    <CameraAltOutlinedIcon

                      sx={{

                        fontSize: 16,

                      }}

                    />

                  </IconButton>

                )}

              </Box>



              <input

                ref={fileInputRef}

                type="file"

                accept="image/*"

                hidden

                onChange={

                  handleImageUpload

                }

              />



              {/* USER DETAILS */}



              <Box

                sx={{

                  minWidth: 0,

                }}

              >

                <Typography

                  sx={{

                    fontSize: {

                      xs: "18px",

                      sm: "21px",

                    },



                    fontWeight: 700,



                    lineHeight: 1.2,



                    overflow:

                      "hidden",



                    textOverflow:

                      "ellipsis",



                    whiteSpace:

                      "nowrap",

                  }}

                >

                  {profile.name ||

                    "Productivity User"}

                </Typography>



                <Typography

                  sx={{

                    mt: 0.4,



                    fontSize: "12px",



                    color:

                      "text.secondary",

                  }}

                >

                  {profile.occupation ||
                      "Add your occupation"}

                </Typography>



                <Typography

                  sx={{

                    mt: 0.5,



                    fontSize: "10px",



                    color:

                      "text.secondary",

                  }}

                >

                  Member since{" "}

                  {memberSince}

                </Typography>

              </Box>

            </Box>



            {/* ================================= */}

            {/* PROFILE ACTIONS */}

            {/* ================================= */}



            <Box

              sx={{

                display: "flex",



                alignItems: "center",



                gap: 1,



                width: {

                  xs: "100%",

                  md: "auto",

                },

              }}

            >

              {/* REMOVE PHOTO */}



              {editMode &&

                profile.profileImage && (

                  <Button

                    fullWidth={false}

                    variant="outlined"

                    color="error"

                    size="small"

                    startIcon={

                      <DeleteOutlineOutlinedIcon />

                    }

                    onClick={

                      handleRemoveImage

                    }

                    sx={{

                      width: {

                        xs: "100%",

                        md: "auto",

                      },



                      borderRadius: 1,



                      textTransform:

                        "none",



                      fontSize: "11px",

                    }}

                  >

                    Remove Photo

                  </Button>

                )}



              {/* EDIT PROFILE */}



              {!editMode && (

                <Button

                  fullWidth={false}

                  variant="contained"

                  size="small"

                  startIcon={

                    <EditOutlinedIcon />

                  }

                  onClick={() =>

                    setEditMode(true)

                  }

                  sx={{

                    width: {

                      xs: "100%",

                      md: "auto",

                    },



                    minHeight: 36,



                    borderRadius: 1,



                    px: 1.75,



                    textTransform:

                      "none",



                    fontSize: "11px",



                    fontWeight: 600,



                    boxShadow: "none",



                    "&:hover": {

                      boxShadow:

                        "none",

                    },

                  }}

                >

                  Edit Profile

                </Button>

              )}

            </Box>

          </Box>

        </CardContent>

      </Card>



      {/* ====================================== */}

      {/* MAIN CONTENT */}

      {/* ====================================== */}



      <Box

        sx={{

          display: "grid",



          gridTemplateColumns: {

            xs: "1fr",



            lg:

              "minmax(0, 1.65fr) minmax(280px, 0.75fr)",

          },



          gap: 2,



          alignItems: "start",

        }}

      >

        {/* ==================================== */}

        {/* PERSONAL INFORMATION */}

        {/* ==================================== */}



        <Card

          sx={{

            border: "1px solid",



            borderColor:

              "divider",



            borderRadius: 1.5,



            boxShadow: "none",

          }}

        >

          <CardContent

            sx={{

              p: {

                xs: 2,

                sm: 2.5,

              },



              "&:last-child": {

                pb: {

                  xs: 2,

                  sm: 2.5,

                },

              },

            }}

          >

            {/* SECTION HEADER */}



            <Box

              sx={{

                display: "flex",



                alignItems:

                  "center",



                gap: 1,

              }}

            >

              <Box

                sx={{

                  width: 32,



                  height: 32,



                  display: "flex",



                  alignItems:

                    "center",



                  justifyContent:

                    "center",



                  borderRadius: 1,



                  backgroundColor:

                    "action.hover",



                  color:

                    "primary.main",

                }}

              >

                <PersonOutlineOutlinedIcon

                  sx={{

                    fontSize: 17,

                  }}

                />

              </Box>



              <Box>

                <Typography

                  sx={{

                    fontSize:

                      "13px",



                    fontWeight: 700,

                  }}

                >

                  Personal Information

                </Typography>



                <Typography

                  sx={{

                    mt: 0.2,



                    fontSize:

                      "10px",



                    color:

                      "text.secondary",

                  }}

                >

                  Your basic profile

                  details

                </Typography>

              </Box>

            </Box>



            <Divider

              sx={{

                my: 2,

              }}

            />



            {/* FORM */}



            <Box

              sx={{

                display: "grid",



                gridTemplateColumns: {

                  xs: "1fr",



                  sm:

                    "repeat(2, minmax(0, 1fr))",

                },



                gap: 1.5,

              }}

            >

              <ProfileField

                icon={

                  <PersonOutlineOutlinedIcon />

                }

                label="Full Name"

                name="name"

                value={profile.name}

                onChange={handleChange}

                disabled={!editMode}

              />



              <ProfileField

                icon={

                  <MailOutlineOutlinedIcon />

                }

                label="Email"

                name="email"

                type="email"

                value={profile.email}

                onChange={handleChange}

                disabled={!editMode}

              />



              <ProfileField

                icon={

                  <PhoneOutlinedIcon />

                }

                label="Phone"

                name="phone"

                value={profile.phone}

                onChange={handleChange}

                disabled={!editMode}

              />



              <ProfileField
                icon={
                  <WorkOutlineOutlinedIcon />
                }
                label="Occupation"
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                disabled={!editMode}
              />

              <ProfileField
                icon={
                  <PersonOutlineOutlinedIcon />
                }
                label="Account Role"
                name="role"
                value={profile.role}
                onChange={handleChange}
                disabled
              />



              <TextField

                label="Bio"

                name="bio"

                value={profile.bio}

                onChange={handleChange}

                disabled={!editMode}

                fullWidth

                multiline

                minRows={3}

                placeholder="Tell something about yourself..."

                sx={{

                  gridColumn: {

                    xs: "auto",

                    sm: "1 / -1",

                  },



                  "& .MuiOutlinedInput-root":

                    {

                      borderRadius: 1,



                      fontSize: "12px",

                    },



                  "& .MuiInputLabel-root":

                    {

                      fontSize: "12px",

                    },

                }}

              />

            </Box>



            {/* EDIT ACTIONS */}



            {editMode && (

              <Box

                sx={{

                  display: "flex",



                  justifyContent: {

                    xs: "stretch",

                    sm: "flex-end",

                  },



                  flexDirection: {

                    xs: "column-reverse",

                    sm: "row",

                  },



                  gap: 1,



                  mt: 2,

                }}

              >

                <Button

                  variant="outlined"

                  size="small"

                  onClick={

                    handleCancel

                  }

                  sx={{

                    minHeight: 36,



                    borderRadius: 1,



                    px: 2,



                    textTransform:

                      "none",



                    fontSize: "11px",



                    width: {

                      xs: "100%",

                      sm: "auto",

                    },

                  }}

                >

                  Cancel

                </Button>



                <Button

                  variant="contained"

                  size="small"

                  startIcon={

                    <SaveOutlinedIcon />

                  }

                  onClick={handleSave}

                  sx={{

                    minHeight: 36,



                    borderRadius: 1,



                    px: 2,



                    textTransform:

                      "none",



                    fontSize: "11px",



                    fontWeight: 600,



                    width: {

                      xs: "100%",

                      sm: "auto",

                    },



                    boxShadow: "none",



                    "&:hover": {

                      boxShadow:

                        "none",

                    },

                  }}

                >

                  Save Profile

                </Button>

              </Box>

            )}

          </CardContent>

        </Card>



        {/* ==================================== */}

        {/* PRODUCTIVITY */}

        {/* ==================================== */}



        <Card

          sx={{

            border: "1px solid",



            borderColor:

              "divider",



            borderRadius: 1.5,



            boxShadow: "none",

          }}

        >

          <CardContent

            sx={{

              p: {

                xs: 2,

                sm: 2.5,

              },



              "&:last-child": {

                pb: {

                  xs: 2,

                  sm: 2.5,

                },

              },

            }}

          >

            {/* HEADER */}



            <Box

              sx={{

                display: "flex",



                alignItems:

                  "center",



                gap: 1,

              }}

            >

              <Box

                sx={{

                  width: 32,



                  height: 32,



                  display: "flex",



                  alignItems:

                    "center",



                  justifyContent:

                    "center",



                  borderRadius: 1,



                  backgroundColor:

                    "action.hover",



                  color:

                    "primary.main",

                }}

              >

                <TrendingUpRoundedIcon

                  sx={{

                    fontSize: 18,

                  }}

                />

              </Box>



              <Box>

                <Typography

                  sx={{

                    fontSize:

                      "13px",



                    fontWeight: 700,

                  }}

                >

                  Productivity

                </Typography>



                <Typography

                  sx={{

                    mt: 0.2,



                    fontSize:

                      "10px",



                    color:

                      "text.secondary",

                  }}

                >

                  Current task

                  performance

                </Typography>

              </Box>

            </Box>



            <Divider

              sx={{

                my: 2,

              }}

            />



            {/* PRODUCTIVITY STATS */}



            <Box

              sx={{

                display: "flex",



                flexDirection:

                  "column",



                gap: 1,

              }}

            >

              <ProductivityStat

                icon={

                  <TaskAltOutlinedIcon />

                }

                label="Total Tasks"

                value={totalTasks}

                iconColor="primary.main"

              />



              <ProductivityStat

                icon={

                  <CheckCircleOutlineRoundedIcon />

                }

                label="Completed"

                value={completedTasks}

                iconColor="success.main"

              />



              <ProductivityStat

                icon={

                  <TrendingUpRoundedIcon />

                }

                label="Completion Rate"

                value={`${progress}%`}

                iconColor="primary.main"

              />

            </Box>



            {/* PROGRESS */}



            <Box

              sx={{

                mt: 2.5,

              }}

            >

              <Box

                sx={{

                  display: "flex",



                  justifyContent:

                    "space-between",



                  alignItems: "center",



                  mb: 0.75,

                }}

              >

                <Typography

                  sx={{

                    fontSize: "10px",



                    fontWeight: 600,



                    color:

                      "text.secondary",

                  }}

                >

                  Overall progress

                </Typography>



                <Typography

                  sx={{

                    fontSize: "10px",



                    fontWeight: 700,



                    color:

                      "primary.main",

                  }}

                >

                  {progress}%

                </Typography>

              </Box>



              <LinearProgress

                variant="determinate"

                value={progress}

                sx={{

                  height: 5,



                  borderRadius: 5,



                  backgroundColor:

                    "action.hover",



                  "& .MuiLinearProgress-bar":

                    {

                      borderRadius: 5,

                    },

                }}

              />

            </Box>

          </CardContent>

        </Card>

      </Box>

    </Box>

  );

};



// ==========================================

// PROFILE FIELD

// ==========================================



const ProfileField = ({

  icon,

  label,

  name,

  type = "text",

  value,

  onChange,

  disabled,

}) => {

  return (

    <TextField

      label={label}

      name={name}

      type={type}

      value={value}

      onChange={onChange}

      disabled={disabled}

      fullWidth

      InputProps={{

        startAdornment: (

          <Box

            sx={{

              display: "flex",



              alignItems:

                "center",



              mr: 0.75,



              color:

                "text.secondary",



              "& svg": {

                fontSize: 16,

              },

            }}

          >

            {icon}

          </Box>

        ),

      }}

      sx={{

        "& .MuiOutlinedInput-root":

          {

            borderRadius: 1,



            fontSize: "12px",



            backgroundColor:

              disabled

                ? "action.hover"

                : "background.paper",

          },



        "& .MuiInputLabel-root":

          {

            fontSize: "12px",

          },

      }}

    />

  );

};



// ==========================================

// PRODUCTIVITY STAT

// ==========================================



const ProductivityStat = ({

  icon,

  label,

  value,

  iconColor,

}) => {

  return (

    <Box

      sx={{

        display: "flex",



        alignItems: "center",



        justifyContent:

          "space-between",



        gap: 1.5,



        p: 1.25,



        borderRadius: 1,



        backgroundColor:

          "action.hover",

      }}

    >

      <Box

        sx={{

          display: "flex",



          alignItems: "center",



          gap: 1,

        }}

      >

        <Box

          sx={{

            width: 30,



            height: 30,



            display: "flex",



            alignItems:

              "center",



            justifyContent:

              "center",



            borderRadius: 1,



            backgroundColor:

              "background.paper",



            color: iconColor,



            "& svg": {

              fontSize: 16,

            },

          }}

        >

          {icon}

        </Box>



        <Typography

          sx={{

            fontSize: "11px",



            fontWeight: 600,



            color:

              "text.secondary",

          }}

        >

          {label}

        </Typography>

      </Box>



      <Typography

        sx={{

          fontSize: "14px",



          fontWeight: 700,



          color:

            "text.primary",

        }}

      >

        {value}

      </Typography>

    </Box>

  );

};



export default Profile;