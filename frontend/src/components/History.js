import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    setHistoryList(storedHistory.slice(0, 10));
  }, []);

  const handleDelete = (id) => {
    const updatedHistory = historyList.filter((record) => record.id !== id);
    setHistoryList(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };

  return (
    <Container maxWidth="md" className="history-page">
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          나의 상담 기록
        </Typography>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          최근 상담 내역
        </Typography>

        <List>
          {historyList.length > 0 ? (
            historyList.map((record) => (
              <React.Fragment key={record.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <ListItemText
                    primary={record.topic}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {record.date}
                        </Typography>
                        {` — ${record.summary?.substring(0, 50)}...`}
                      </React.Fragment>
                    }
                  />
                  <Box>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/history/${record.id}`)}
                      sx={{ mr: 1 }}
                    >
                      상세 보기
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(record.id)}
                    >
                      삭제
                    </Button>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary">
              상담 기록이 없습니다.
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default History;
