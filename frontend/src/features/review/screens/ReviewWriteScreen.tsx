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
import { ReviewWriteStyles as styles } from "../styles/ReviewWriteStyles";
import { userApi } from "../../../api/userApi";

export default function ReviewWriteScreen({ navigation }: any) {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 공통 입력
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState("");

  // 책
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [readStart, setReadStart] = useState("");
  const [readEnd, setReadEnd] = useState("");

  // 영화
  const [director, setDirector] = useState("");
  const [actors, setActors] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [watchDate, setWatchDate] = useState("");

  // 드라마
  const [writer, setWriter] = useState("");
  const [broadcaster, setBroadcaster] = useState("");
  const [airedYear, setAiredYear] = useState("");
  const [dramaWatchDate, setDramaWatchDate] = useState("");

  // 애니메이션
  const [studio, setStudio] = useState("");
  const [animationWriter, setAnimationWriter] = useState("");
  const [animationWatchDate, setAnimationWatchDate] = useState("");

  // ⭐️ 날짜 자동 형식 함수
  const handleDateInput = (text: string, setter: (v: string) => void) => {
    let cleaned = text.replace(/[^0-9]/g, ""); // 숫자 외 제거

    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    let formatted = cleaned;
    if (cleaned.length > 4) formatted = cleaned.slice(0, 4) + "-" + cleaned.slice(4);
    if (cleaned.length > 6)
      formatted =
          cleaned.slice(0, 4) +
          "-" +
          cleaned.slice(4, 6) +
          "-" +
          cleaned.slice(6);

    setter(formatted);
  };

  // ⭐️ 별점
  const starCount = 5;

  // 저장
  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert("카테고리 선택", "카테고리를 먼저 선택해주세요!");
      return;
    }

    try {
      const me = await userApi.getMyInfo();

      const common = {
        userId: me.id,
        title,
        content,
        category: selectedCategory,
        rating,
        imageUrl: image || null,
      };

      let detail: any = {};

      if (selectedCategory === "book") {
        detail = {
          author,
          publisher,
          readStartDate: readStart || null,
          readEndDate: readEnd || null
        };
      }

      if (selectedCategory === "movie") {
        detail = {
          director: director || null,
          releaseDate: watchDate || null,  // ⭐ watchDate → releaseDate로 매핑
          runningTime: null                // 필요 없으니 null
        };
      }

      if (selectedCategory === "drama") {
        detail = {
          broadcastNetwork: broadcaster || null,
          startDate: dramaWatchDate || null,
          endDate: null                    // 종료일 없으면 null
        };
      }

      if (selectedCategory === "animation") {
        detail = {
          studio: studio || null,
          episodes: null,                  // 백엔드에 episodes 있으니까 null로 보내기
          releaseDate: animationWatchDate || null
        };
      }


      const res = await axios.post(`${API_URL}/api/posts`, {
        ...common,
        detail,
      });

      Alert.alert("등록 완료", "리뷰가 저장되었습니다.");
      navigation.navigate("ReviewDetail", { review: res.data });
    } catch (e) {
      console.error("❌ 등록 실패:", e);
      Alert.alert("오류", "등록 중 문제가 발생했습니다.");
    }
  };

  // 카테고리별 입력 폼
  const renderCategoryFields = () => {
    switch (selectedCategory) {
      case "book":
        return (
            <>
              <TextInput style={styles.input} placeholder="저자" value={author} onChangeText={setAuthor} />
              <TextInput style={styles.input} placeholder="출판사" value={publisher} onChangeText={setPublisher} />
              <TextInput
                  style={styles.input}
                  placeholder="읽기 시작일 YYYY-MM-DD"
                  value={readStart}
                  onChangeText={(t) => handleDateInput(t, setReadStart)}
              />
              <TextInput
                  style={styles.input}
                  placeholder="읽기 종료일 YYYY-MM-DD"
                  value={readEnd}
                  onChangeText={(t) => handleDateInput(t, setReadEnd)}
              />
            </>
        );

      case "movie":
        return (
            <>
              <TextInput style={styles.input} placeholder="감독" value={director} onChangeText={setDirector} />
              <TextInput style={styles.input} placeholder="출연 배우" value={actors} onChangeText={setActors} />
              <TextInput
                  style={styles.input}
                  placeholder="개봉 연도 (YYYY)"
                  value={releaseYear}
                  onChangeText={(t) => setReleaseYear(t.replace(/[^0-9]/g, "").slice(0, 4))}
              />
              <TextInput
                  style={styles.input}
                  placeholder="관람일 YYYY-MM-DD"
                  value={watchDate}
                  onChangeText={(t) => handleDateInput(t, setWatchDate)}
              />
            </>
        );

      case "drama":
        return (
            <>
              <TextInput style={styles.input} placeholder="작가" value={writer} onChangeText={setWriter} />
              <TextInput style={styles.input} placeholder="방송사" value={broadcaster} onChangeText={setBroadcaster} />
              <TextInput
                  style={styles.input}
                  placeholder="방영 연도 (YYYY)"
                  value={airedYear}
                  onChangeText={(t) => setAiredYear(t.replace(/[^0-9]/g, "").slice(0, 4))}
              />
              <TextInput
                  style={styles.input}
                  placeholder="시청일 YYYY-MM-DD"
                  value={dramaWatchDate}
                  onChangeText={(t) => handleDateInput(t, setDramaWatchDate)}
              />
            </>
        );

      case "animation":
        return (
            <>
              <TextInput style={styles.input} placeholder="제작사" value={studio} onChangeText={setStudio} />
              <TextInput style={styles.input} placeholder="작가" value={animationWriter} onChangeText={setAnimationWriter} />
              <TextInput
                  style={styles.input}
                  placeholder="시청일 YYYY-MM-DD"
                  value={animationWatchDate}
                  onChangeText={(t) => handleDateInput(t, setAnimationWatchDate)}
              />
            </>
        );
    }
    return null;
  };

  const categories = [
    { key: "book", label: "책" },
    { key: "movie", label: "영화" },
    { key: "drama", label: "드라마" },
    { key: "animation", label: "애니메이션" },
  ];

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.header}>리뷰 작성</Text>

          {/* 카테고리 선택 */}
          <Text style={styles.label}>카테고리 선택</Text>
          <View style={styles.categoryGroup}>
            {categories.map((c) => (
                <TouchableOpacity
                    key={c.key}
                    style={[styles.categoryButton, selectedCategory === c.key && styles.categorySelected]}
                    onPress={() => setSelectedCategory(c.key)}
                >
                  <Text
                      style={[
                        styles.categoryText,
                        selectedCategory === c.key && styles.categoryTextSelected,
                      ]}
                  >
                    {c.label}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>

          {/* 공통 입력 */}
          <TextInput style={styles.input} placeholder="제목" value={title} onChangeText={setTitle} />
          <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="내용"
              value={content}
              onChangeText={setContent}
              multiline
          />
          <TextInput style={styles.input} placeholder="이미지 URL" value={image} onChangeText={setImage} />

          {/* 별점 */}
          <Text style={styles.label}>별점 선택 ({rating})</Text>
          <View style={styles.starContainer}>
            {Array.from({ length: starCount }).map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
                  <Ionicons
                      name={i + 1 <= rating ? "star" : "star-outline"}
                      size={36}
                      color="#F2C94C"
                      style={{ marginHorizontal: 3 }}
                  />
                </TouchableOpacity>
            ))}
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
