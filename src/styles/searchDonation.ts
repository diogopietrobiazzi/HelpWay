import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5FA',
  },
  flex: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1E293B',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 10,
  },
  distanceLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#4F6AF6',
    marginBottom: 20,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  typeButtonSelected: {
    backgroundColor: '#4F6AF6',
    borderColor: '#4F6AF6',
  },
  typeButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtonTextSelected: {
    color: '#FFFFFF',
  },
  closeButton: {
    backgroundColor: '#1E293B',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
});