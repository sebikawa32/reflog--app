import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import React, { useState } from "react";
import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { GroupFeedCreateStyles as styles } from "../styles/GroupFeedCreateStyles";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export default function GroupFeedCreateScreen({ route, navigation }: any) {
    const { groupId, leaderId } = route.params;

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("BOOK");

    const [desc, setDesc] = useState("");
    const [endDate, setEndDate] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    /** 카테고리별 필드 */
    const [fields, setFields] = useState({
        author: "",
        publisher: "",
        year: "",
        director: "",
        studio: "",
        platform: "",
        writer: "",
    });

    /** 카테고리 목록 */
    const categoryList = [
        { key: "BOOK", label: "책" },
        { key: "MOVIE", label: "영화" },
        { key: "DRAMA", label: "드라마" },
        { key: "ANIMATION", label: "애니메이션" },
    ];

    /** 날짜 선택 */
    const onDateChange = (event: any, selected?: Date) => {
        setShowPicker(false);
        if (selected) {
            const iso = selected.toISOString().substring(0, 10);
            setEndDate(iso);
        }
    };

    /** contentInfo JSON 변환 */
    const buildContentInfo = () => {
        const data: any = {};

        if (category === "BOOK") {
            if (fields.author) data.author = fields.author;
            if (fields.publisher) data.publisher = fields.publisher;
            if (fields.year) data.year = fields.year;
        }
        if (category === "MOVIE") {
            if (fields.director) data.director = fields.director;
            if (fields.studio) data.studio = fields.studio;
            if (fields.platform) data.platform = fields.platform;
        }
        if (category === "DRAMA") {
            if (fields.writer) data.writer = fields.writer;
            if (fields.director) data.director = fields.director;
            if (fields.platform) data.platform = fields.platform;
        }
        if (category === "ANIMATION") {
            if (fields.author) data.author = fields.author;
            if (fields.studio) data.studio = fields.studio;
            if (fields.platform) data.platform = fields.platform;
        }

        return Object.keys(data).length === 0 ? null : JSON.stringify(data);
    };

    /** 등록 요청 */
    const handleCreate = async () => {
        if (!title.trim()) {
            Alert.alert("필수 입력", "제목을 반드시 입력해야 합니다.");
            return;
        }
    
        if (!endDate.trim()) {
            Alert.alert("필수 입력", "목표 날짜를 입력하세요.");
            return;
        }
    
        try {
            const token = await AsyncStorage.getItem("accessToken");
    
            const body = {
                leaderId,
                groupId,
                title,
                category,
                contentInfo: buildContentInfo(),
                introText: desc || null,
                thumbnailUrl: null,
                endDate,
            };
    
            // ⭐ 핵심: 생성된 feedDto 응답 받기
            const res = await axios.post(`${BASE_URL}/api/group-feed/create`, body, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            const createdFeed = res.data;
    
            if (!createdFeed || !createdFeed.id) {
                Alert.alert("에러", "피드는 생성됐지만 ID를 받지 못했습니다.");
                return;
            }
    
            Alert.alert("성공", "그룹 피드가 생성되었습니다!");
    
            // ⭐ 생성된 피드 상세 페이지로 이동
            navigation.replace("FeedDetail", { feedId: createdFeed.id });
    
        } catch (e) {
            console.log("Feed create error:", e);
            Alert.alert("에러", "피드를 생성할 수 없습니다.");
        }
    };
    
    

    /** 카테고리별 입력칸 */
    const renderCategoryFields = () => {
        switch (category) {
            case "BOOK":
                return (
                    <>
                        <Text style={styles.label}>작가</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.author}
                            onChangeText={(v) => setFields({ ...fields, author: v })}
                        />

                        <Text style={styles.label}>출판사</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.publisher}
                            onChangeText={(v) => setFields({ ...fields, publisher: v })}
                        />

                        <Text style={styles.label}>출간년도</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.year}
                            onChangeText={(v) => setFields({ ...fields, year: v })}
                        />
                    </>
                );

            case "MOVIE":
                return (
                    <>
                        <Text style={styles.label}>감독</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.director}
                            onChangeText={(v) => setFields({ ...fields, director: v })}
                        />

                        <Text style={styles.label}>제작사</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.studio}
                            onChangeText={(v) => setFields({ ...fields, studio: v })}
                        />

                        <Text style={styles.label}>플랫폼</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.platform}
                            onChangeText={(v) => setFields({ ...fields, platform: v })}
                        />
                    </>
                );

            case "DRAMA":
                return (
                    <>
                        <Text style={styles.label}>작가</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.writer}
                            onChangeText={(v) => setFields({ ...fields, writer: v })}
                        />

                        <Text style={styles.label}>감독</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.director}
                            onChangeText={(v) => setFields({ ...fields, director: v })}
                        />

                        <Text style={styles.label}>플랫폼</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.platform}
                            onChangeText={(v) => setFields({ ...fields, platform: v })}
                        />
                    </>
                );

            case "ANIMATION":
                return (
                    <>
                        <Text style={styles.label}>작가</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.author}
                            onChangeText={(v) => setFields({ ...fields, author: v })}
                        />

                        <Text style={styles.label}>제작사</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.studio}
                            onChangeText={(v) => setFields({ ...fields, studio: v })}
                        />

                        <Text style={styles.label}>플랫폼</Text>
                        <TextInput
                            style={styles.input}
                            value={fields.platform}
                            onChangeText={(v) => setFields({ ...fields, platform: v })}
                        />
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>그룹 피드 만들기</Text>

            {/* 제목 */}
            <Text style={styles.label}>제목</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />

            {/* 카테고리 */}
            <Text style={styles.label}>카테고리</Text>
            <View style={styles.categoryRow}>
                {categoryList.map((c) => (
                    <TouchableOpacity
                        key={c.key}
                        style={[
                            styles.categoryButton,
                            category === c.key && styles.categorySelected,
                        ]}
                        onPress={() => setCategory(c.key)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                category === c.key && styles.categoryTextSelected,
                            ]}
                        >
                            {c.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* 카테고리별 입력칸 */}
            {renderCategoryFields()}

            {/* 설명 */}
            <Text style={styles.label}>설명</Text>
            <TextInput
                style={styles.input}
                value={desc}
                onChangeText={setDesc}
            />

            {/* 날짜 */}
            <Text style={styles.label}>목표 날짜</Text>
            <Pressable onPress={() => setShowPicker(true)}>
                <View pointerEvents="none">
                    <TextInput
                        style={styles.input}
                        value={endDate}
                        placeholder="날짜 선택"
                    />
                </View>
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={endDate ? new Date(endDate) : new Date()}
                    mode="date"
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    onChange={onDateChange}
                />
            )}

            {/* 버튼 */}
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>피드 생성하기</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
