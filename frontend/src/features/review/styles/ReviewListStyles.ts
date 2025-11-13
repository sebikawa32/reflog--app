import { StyleSheet } from 'react-native';

export const ReviewListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2F2B28',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3B3025',
    textAlign: 'center',
    marginTop: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  ratingText: {
    fontSize: 12,
    color: '#8C8277',
    marginLeft: 3,
  },
});
