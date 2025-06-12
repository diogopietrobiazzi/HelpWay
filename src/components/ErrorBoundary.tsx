import React, { Component, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Atualiza o estado para que a próxima renderização mostre a UI de fallback.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Você também pode registrar o erro em um serviço de log de erros
    console.error("--- ERRO CAPTURADO PELO ERRORBOUNDARY ---");
    console.error("Erro:", error);
    console.error("Informações do Componente:", errorInfo.componentStack);
    console.error("-----------------------------------------");
  }

  public render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI de fallback aqui
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Ocorreu um Erro</Text>
          <Text style={styles.subtitle}>Algo inesperado aconteceu e o aplicativo não pôde continuar.</Text>
          <Text style={styles.errorText}>
            {this.state.error?.toString()}
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  }
});

export default ErrorBoundary;