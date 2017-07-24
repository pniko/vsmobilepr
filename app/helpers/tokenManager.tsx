import {
  AsyncStorage
} from 'react-native';

const TOKEN_KEY: string = "AUTH_TOKEN";

class TokenManager {

  // TODO: Switch to Oauth or secure storage for token

  async readToken(): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(TOKEN_KEY);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(`TokenManager: Couldn't read token: ${error}`);
    }
  }

  async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.log(`TokenManager: Couldn't save token: ${error}`);
    }
  }
}

export default new TokenManager()