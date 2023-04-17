import { useState, useEffect } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import "../../../../../node_modules/react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../../theme";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InsertPageBreakIcon from '@mui/icons-material/InsertPageBreak';
import InventoryIcon from '@mui/icons-material/Inventory';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected({page_selected: title})
        if(title!=='Sign Out'){
          define_selected_page(title)
        }
        else{
          define_selected_page('')
          window.localStorage.removeItem('MAINPAGE_SELECTED')
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const define_selected_page = (page) => {
  window.localStorage.setItem('MAINPAGE_SELECTED', JSON.stringify({ page_selected: page }))
  console.log('define',typeof page,page)
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState({page_selected: 'Home'})
  const [user, setUser] = useState({})
  const [logged_In, set_Logged_In_Status] = useState(false)

  const history = useHistory()

  useEffect(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) {setUser(JSON.parse(browser_data))}
    const page_selected_data = window.localStorage.getItem('MAINPAGE_SELECTED')
    if (page_selected_data !== null) {
      setSelected(JSON.parse(page_selected_data))
      console.log('page',typeof page_selected_data, JSON.parse(page_selected_data))
    }
  }, [])

  useEffect(() => {
    // console.log('user UseEffect:', user, typeof user.user_id)
    console.log('user_data',user)
    // setUserAuthorized((user.logged_in))
    // logged = user.logged_in
    // console.log('uawe authorized', user.logged_in)
  }, [user])

  const signOut = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify({ user_id: '', password: '', logged_in: false, role:'' }))
    setTimeout(() => {
      history.push('/Proj2_DBI/')
      console.log('pushing to /Proj2_DBI/')
      history.go(0)
    }, 3000)
  }

  const signOut2 = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem('LOGIN_STATUS', JSON.stringify({ user_id: '', password: '', logged_in: false, role:'' }))
    window.localStorage.setItem('MAINPAGE_SELECTED', JSON.stringify({ page_selected: '' }))
    // setTimeout(() => {
      // history.push('/Proj2_DBI/')
      // console.log('pushing to /Proj2_DBI/')
      // history.go(0)
    // }, 3000)
  }

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{height: "100%"}}>
        <Menu iconShape="square" >
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  {user.role}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={"https://github.com/JDgomez2002/Proj2_DBI_production/blob/main/Proj2-DBI-production/src/img/stethoscope-icon.png?raw=true"}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user.user_id}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  DB1
                </Typography>
              </Box>
            </Box>
          )}

          {/* THIS ARE THE SIDE BAR ICONS */}
          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title="Home"
              to="/Proj2_DBI/MainPage"
              icon={<HomeOutlinedIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Data
            </Typography>
            <Item
              title="Incidence"
              to="/Proj2_DBI/MainPage/incidence/"
              icon={<PeopleOutlinedIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />

            { (user.role==='Doctor') &&
              <>
              <Typography variant="h6" color={colors.grey[300]} sx={{ m: '20px 0 5px 20px' }}>
                Register Data
              </Typography>
              <Item
                title="Insert Incidence"
                to="/Proj2_DBI/MainPage/insert-incidence"
                icon={<InsertPageBreakIcon />}
                selected={selected.page_selected}
                setSelected={setSelected}
              />
              <Item
                title="Inventory"
                to="/Proj2_DBI/MainPage/inventory"
                icon={<InventoryIcon />}
                selected={selected.page_selected}
                setSelected={setSelected}
              />
            </>}

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '20px 0 5px 20px' }}>
              Reports
            </Typography>
            <Item
              title="Bar Chart"
              to="/Proj2_DBI/MainPage/"
              icon={<BarChartOutlinedIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/Proj2_DBI/MainPage/"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: '20px 0 5px 20px' }}>
              Exit
            </Typography>
            <Item
              title="Sign Out"
              to="/Proj2_DBI/"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
              onClick={signOut2}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
