import { useState, useEffect, useMemo } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import '../../../../../node_modules/react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../../../theme'
import HomeIcon from '@mui/icons-material/Home';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import InventoryIcon from '@mui/icons-material/Inventory'
import EditNoteIcon from '@mui/icons-material/EditNote'
import PostAddIcon from '@mui/icons-material/PostAdd'
import MedicationIcon from '@mui/icons-material/Medication'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import AccessibleIcon from '@mui/icons-material/Accessible'
import PieChartIcon from '@mui/icons-material/PieChart';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
        margin: '0px',
        padding: '0px 0px',
        height: '30px',
      }}
      onClick={() => {
        setSelected({ page_selected: title })
        if (title !== 'Sign Out') {
          define_selected_page(title)
        } else {
          define_selected_page('')
          window.localStorage.removeItem('MAINPAGE_SELECTED')
          window.localStorage.removeItem('SIDEBAR_COLAPSED')
          signOut()
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
  console.log('define', typeof page, page)
}

const colapse_sidebar = (sidebar_colpased_value) => {
  window.localStorage.setItem(
    'SIDEBAR_COLAPSED',
    JSON.stringify({ colapsed: sidebar_colpased_value })
  )
}

const Sidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isCollapsed, setIsCollapsed] = useState({ colapsed: false })
  const [selected, setSelected] = useState({ page_selected: 'Home' })
  const [user, setUser] = useState({})
  const [logged_In, set_Logged_In_Status] = useState(false)

  const history = useHistory()

  useMemo(() => {
    const browser_data = window.localStorage.getItem('LOGIN_STATUS')
    if (browser_data !== null) {
      setUser(JSON.parse(browser_data))
    }
    const page_selected_data = window.localStorage.getItem('MAINPAGE_SELECTED')
    if (page_selected_data !== null) {
      setSelected(JSON.parse(page_selected_data))
      // console.log('page',typeof page_selected_data, JSON.parse(page_selected_data))
    }
    const sidebar_colapsed = window.localStorage.getItem('SIDEBAR_COLAPSED')
    if (sidebar_colapsed !== null) {
      setIsCollapsed(JSON.parse(sidebar_colapsed))
    }
    const theme_mode = window.localStorage.getItem('THEME_MODE')
    if (theme_mode !== null) {
      setIsCollapsed(JSON.parse(theme_mode))
    }
  }, [])

  useEffect(() => {
    // console.log('user UseEffect:', user, typeof user.user_id)
    // console.log('user_data',user)
    // setUserAuthorized((user.logged_in))
    // logged = user.logged_in
    // console.log('uawe authorized', user.logged_in)
  }, [user])

  const signOut = () => {
    // console.log('signing out...')
    set_Logged_In_Status(false)
    window.localStorage.setItem(
      'LOGIN_STATUS',
      JSON.stringify({ user_id: '', password: '', logged_in: false, role: '' })
    )
    window.localStorage.setItem('MAINPAGE_SELECTED', JSON.stringify({ page_selected: '' }))
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
      <ProSidebar collapsed={isCollapsed.colapsed}>
        {' '}
        {/*style={{height: "100vh"}}*/}
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => {
              setIsCollapsed({ colapsed: !isCollapsed.colapsed })
              colapse_sidebar(!isCollapsed.colapsed)
            }}
            icon={isCollapsed.colapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed.colapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Typography variant="h3" color={colors.grey[100]}>
                  {user.role}
                </Typography>
                <IconButton onClick={() => setIsCollapsed({ colapsed: !isCollapsed.colapsed })}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed.colapsed && (
            <Box mb="5px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="70px"
                  height="70px"
                  src={
                    'https://github.com/JDgomez2002/Proj2_DBI_production/blob/main/Proj2-DBI-production/src/img/stethoscope-icon.png?raw=true'
                  }
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  fontSize={'25px'}
                  sx={{ m: '10px 0 0 0' }}
                >
                  {user.user_id}
                </Typography>
              </Box>
            </Box>
          )}

          {/* ------------------------------------------------------------------------------------------------- */}
          {/* THIS ARE THE SIDE BAR ICONS */}
          {/* ------------------------------------------------------------------------------------------------- */}
          <Box paddingLeft={isCollapsed.colapsed ? undefined : '10%'}>
            <Item
              title="Home"
              to="/Proj2_DBI/MainPage"
              icon={<HomeIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />
            {user.role === 'Administrator' && (
              <Item
                title="Hospitals"
                to="/Proj2_DBI/MainPage/hospitals"
                icon={<MedicationIcon />}
                selected={selected.page_selected}
                setSelected={setSelected}
              />
            )}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              fontSize={'12px'}
              fontFamily={'Bold'}
              sx={{ m: '25px 0 0px 20px' }}
            >
              Data
            </Typography>
            <Item
              title="Incidence"
              to="/Proj2_DBI/MainPage/incidence/"
              icon={<PeopleOutlinedIcon />}
              selected={selected.page_selected}
              setSelected={setSelected}
            />

            {(user.role === 'Doctor' || user.role === 'Administrator') && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  fontSize={'12px'}
                  fontFamily={'Bold'}
                  sx={{ m: '25px 0 0px 20px' }}
                >
                  Edit Data
                </Typography>
                <Item
                  title="Add Incidence"
                  to="/Proj2_DBI/MainPage/insert-incidence"
                  icon={<PostAddIcon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />

                <Item
                  title="Update Incidence"
                  to="/Proj2_DBI/MainPage/update-incidence"
                  icon={<EditNoteIcon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />

                <Item
                  title="New Doctor"
                  to="/Proj2_DBI/MainPage/new-doctor"
                  icon={<PersonAddAlt1Icon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />

                <Item
                  title="New Patient"
                  to="/Proj2_DBI/MainPage/new-patient"
                  icon={<AccessibleIcon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />
              </>
            )}

            {(user.role === 'Doctor' || user.role === 'Administrator') && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  fontSize={'12px'}
                  fontFamily={'Bold'}
                  sx={{ m: '25px 0 0px 20px' }}
                >
                  Reports
                </Typography>
                <Item
                  title="Inventory"
                  to="/Proj2_DBI/MainPage/inventory"
                  icon={<InventoryIcon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Other"
                  to="/Proj2_DBI/MainPage/other"
                  icon={<PieChartIcon />}
                  selected={selected.page_selected}
                  setSelected={setSelected}
                />
              </>
            )}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              fontSize={'12px'}
              fontFamily={'Bold'}
              sx={{ m: '25px 0 0px 20px' }}
            >
              Exit
            </Typography>
            <Item
              title="Sign Out"
              to="/Proj2_DBI/"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
