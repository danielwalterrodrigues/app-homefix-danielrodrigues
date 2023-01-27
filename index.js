import './App/Config/ReactotronConfig'
import { AppRegistry , Text} from 'react-native'
import App from './App/Containers/App'
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
AppRegistry.registerComponent('HomeFix', () => App)
