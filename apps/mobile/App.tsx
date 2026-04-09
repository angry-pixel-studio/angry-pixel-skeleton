import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { extractBundledWebDist } from './src/bundledWeb';

const defaultDevUri = 'http://localhost:3000';

function useGameUri(): { uri: string | null; readAccessDir: string | null; error: string | null } {
  const [uri, setUri] = useState<string | null>(null);
  const [readAccessDir, setReadAccessDir] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      const forceRemote = process.env.EXPO_PUBLIC_FORCE_REMOTE_URL === '1';
      if (__DEV__ || forceRemote) {
        const remote = process.env.EXPO_PUBLIC_GAME_URL ?? defaultDevUri;
        if (!cancelled) {
          setUri(remote);
          setReadAccessDir(null);
        }
        return;
      }

      try {
        const { htmlUri, readAccessDir: rad } = await extractBundledWebDist();
        if (!cancelled) {
          setUri(htmlUri);
          setReadAccessDir(rad);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    }

    void resolve();
    return () => {
      cancelled = true;
    };
  }, []);

  return { uri, readAccessDir, error };
}

export default function App() {
  const { uri, readAccessDir, error } = useGameUri();
  const [loading, setLoading] = useState(true);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  if (!uri) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.safe}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : null}
        <WebView
          source={{ uri }}
          style={styles.webview}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess
          allowFileAccessFromFileURLs
          allowUniversalAccessFromFileURLs
          originWhitelist={['*']}
          allowingReadAccessToURL={Platform.OS === 'ios' && readAccessDir ? readAccessDir : undefined}
          onLoadEnd={() => setLoading(false)}
          onError={() => setLoading(false)}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#000',
  },
  centered: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  errorText: {
    color: '#f66',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    zIndex: 1,
  },
});
