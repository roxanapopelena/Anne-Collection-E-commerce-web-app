import { createMuiTheme } from '@material-ui/core/styles'

export const Theme = createMuiTheme({
    palette: {
        primary: {
            main: '#fce4ec'
        },
        secondary: {
            main: '#ffebee',
            light: '#fff'
        },
        contrastThreshold: 3,
        tonalOffset: .2
    },
})