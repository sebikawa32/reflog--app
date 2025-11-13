import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const ReviewDetailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfbf7',
  },
  container: {
    flex: 1,
    backgroundColor: '#fdfbf7',
    padding: 20,
  },
  coverWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 25,
  },
  coverImage: {
    width: width * 0.85,
    height: 260,
    borderRadius: 16,
    resizeMode: 'cover',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  overlay: {
    position: 'absolute',
    width: width * 0.85,
    height: 260,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3b3025',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#c8a97e',
    alignSelf: 'center',
    borderRadius: 3,
    marginVertical: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  meta: {
    fontSize: 15,
    color: '#5a4a3c',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: '#9d8b7a',
    marginTop: 5,
  },
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6b5a46',
    marginTop: 4,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 30,
    color: '#d8cfc3',
    marginHorizontal: 3,
  },
  activeStar: {
    color: '#f2c94c',
  },
  selectedStar: {
    textShadowColor: '#f5d67a',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
  },
  content: {
    fontSize: 16,
    color: '#3e352c',
    lineHeight: 27,
    marginBottom: 25,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: '#c8a97e',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fffaf2',
  },
});
