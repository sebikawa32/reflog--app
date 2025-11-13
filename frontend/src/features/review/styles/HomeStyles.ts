import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#3B3025',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  statsText: {
    fontSize: 14,
    color: '#6B5F52',
  },
  dot: {
    fontSize: 14,
    color: '#AFA9A1',
    marginHorizontal: 6,
  },
  profileBio: {
    fontSize: 13,
    color: '#8D8174',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  categorySection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3B3025',
    marginBottom: 12,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: '#F9F7F3',
    marginBottom: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A4A3C',
  },
});
