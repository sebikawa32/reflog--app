import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  PanResponder,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReviewWriteStyles as styles } from "../styles/ReviewWriteStyles"; // ✅ 분리된 스타일 import

export default function ReviewWriteScreen({ navigation }: any) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // ✅ 공통 입력
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  // ✅ 책
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [readStart, setReadStart] = useState("");
  const [readEnd, setReadEnd] = useState("");

  // ✅ 영화
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [watchDate, setWatchDate] = useState("");

  // ✅ 드라마
  const [writer, setWriter] = useState("");
  const [broadcaster, setBroadcaster] = useState("");
  const [airedYear, setAiredYear] = useState("");
  const [dramaWatchDate, setDramaWatchDate] = useState("");

  // ✅ 애니메이션
  const [studio, setStudio] = useState("");
  const [animationWriter, setAnimationWriter] = useState("");
  const [animationWatchDate, setAnimationWatchDate] = useState("");

  // ✅ 별점 드래그 관련
  const starCount = 5;
  const [dragRating, setDragRating] = useState(0);
  const starContainerRef = useRef<View>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => handleStarTouch(gestureState),
      onPanResponderMove: (e, gestureState) => handleStarTouch(gestureState),
    })
  ).current;

  const handleStarTouch = (gestureState: any) => {
    if (!starContainerRef.current) return;
    starContainerRef.current.measure((x, y, width, height, pageX) => {
      const touchX = gestureState.moveX - pageX;
      const ratio = Math.min(Math.max(touchX / width, 0), 1);
      const newRating = Math.round(ratio * starCount * 2) / 2;
      setRating(newRating);
      setDragRating(newRating);
    });
  };

  // ✅ 등록 처리
  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert("카테고리 선택", "카테고리를 먼저 선택해주세요!");
      return;
    }

    try {
      const commonData = {
        title,
        content,
        category: selectedCategory,
        rating,
        image: image || null,
      };

      let detailData: any = {};
      let endpoint = `${API_URL}/api/posts/${selectedCategory}`;

      switch (selectedCategory) {
        case "book":
          detailData = {
            author,
            publisher,
            read_start_date: readStart,
            read_end_date: readEnd,
          };
          break;
        case "movie":
          detailData = {
            director,
            actors,
            release_year: parseInt(releaseYear),
            watch_date: watchDate,
          };
          break;
        case "drama":
          detailData = {
            writer,
            broadcaster,
            aired_year: parseInt(airedYear),
            watch_date: dramaWatchDate,
          };
          break;
        case "animation":
          detailData = {
            studio,
            writer: animationWriter,
            watch_date: animationWatchDate,
          };
          break;
      }

      const res = await axios.post(endpoint, { ...commonData, ...detailData });
      const createdPost = res.data;

      Alert.alert("등록 완료", "리뷰가 성공적으로 등록되었습니다 ✨");
      navigation.navigate("ReviewDetail", {
        review: createdPost,
        category: selectedCategory,
      });
    } catch (error) {
      console.error("❌ 등록 실패:", error);
      Alert.alert("오류", "리뷰 저장 중 문제가 발생했습니다.");
    }
  };

  // ✅ 카테고리별 입력폼
  const renderCategoryFields = () => {
    switch (selectedCategory) {
      case "book":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="저자"
              value={author}
              onChangeText={setAuthor}
            />
            <TextInput
              style={styles.input}
              placeholder="출판사"
              value={publisher}
              onChangeText={setPublisher}
            />
            <TextInput
              style={styles.input}
              placeholder="읽기 시작일 (YYYY-MM-DD)"
              value={readStart}
              onChangeText={setReadStart}
            />
            <TextInput
              style={styles.input}
              placeholder="읽기 종료일 (YYYY-MM-DD)"
              value={readEnd}
              onChangeText={setReadEnd}
            />
          </>
        );
      case "movie":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="감독"
              value={director}
              onChangeText={setDirector}
            />
            <TextInput
              style={styles.input}
              placeholder="출연 배우 (쉼표로 구분)"
              value={actors}
              onChangeText={setActors}
            />
            <TextInput
              style={styles.input}
              placeholder="개봉 연도 (YYYY)"
              value={releaseYear}
              onChangeText={setReleaseYear}
            />
            <TextInput
              style={styles.input}
              placeholder="관람일 (YYYY-MM-DD)"
              value={watchDate}
              onChangeText={setWatchDate}
            />
          </>
        );
      case "drama":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="작가"
              value={writer}
              onChangeText={setWriter}
            />
            <TextInput
              style={styles.input}
              placeholder="방송사"
              value={broadcaster}
              onChangeText={setBroadcaster}
            />
            <TextInput
              style={styles.input}
              placeholder="방영 연도 (YYYY)"
              value={airedYear}
              onChangeText={setAiredYear}
            />
            <TextInput
              style={styles.input}
              placeholder="시청일 (YYYY-MM-DD)"
              value={dramaWatchDate}
              onChangeText={setDramaWatchDate}
            />
          </>
        );
      case "animation":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="제작사"
              value={studio}
              onChangeText={setStudio}
            />
            <TextInput
              style={styles.input}
              placeholder="작가"
              value={animationWriter}
              onChangeText={setAnimationWriter}
            />
            <TextInput
              style={styles.input}
              placeholder="시청일 (YYYY-MM-DD)"
              value={animationWatchDate}
              onChangeText={setAnimationWatchDate}
            />
          </>
        );
      default:
        return null;
    }
  };

  const categories = [
    { key: "book", label: "📚 책" },
    { key: "movie", label: "🎬 영화" },
    { key: "drama", label: "📺 드라마" },
    { key: "animation", label: "🎨 애니메이션" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>리뷰 작성 ✏️</Text>

        {/* ✅ 카테고리 선택 */}
        <Text style={styles.label}>카테고리 선택</Text>
        <View style={styles.categoryGroup}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.key}
              style={[
                styles.categoryButton,
                selectedCategory === cat.key && styles.categorySelected,
              ]}
              onPress={() => setSelectedCategory(cat.key)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.key && styles.categoryTextSelected,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 공통 입력 */}
        <TextInput
          style={styles.input}
          placeholder="제목"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="이미지 URL (선택)"
          value={image}
          onChangeText={setImage}
        />

        {/* ⭐️ 별점 입력 */}
        <Text style={styles.label}>별점 선택 ({rating.toFixed(1)})</Text>
        <View
          ref={starContainerRef}
          style={styles.starContainer}
          {...panResponder.panHandlers}
        >
          {Array.from({ length: starCount }).map((_, i) => {
            const full = i + 1 <= rating;
            const half = rating - i === 0.5;
            return (
              <Ionicons
                key={i}
                name={full ? "star" : half ? "star-half" : "star-outline"}
                size={36}
                color="#F2C94C"
                style={{ marginHorizontal: 3 }}
              />
            );
          })}
        </View>

        {/* 카테고리별 입력 */}
        {renderCategoryFields()}

        <View style={{ marginTop: 20 }}>
          <Button title="등록하기" onPress={handleSubmit} color="#C8A97E" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
