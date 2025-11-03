export const formatDate = (isoString) => {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    console.error("Erro ao formatar data:", error);
    return 'Data inválida';
  }
};

export const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);