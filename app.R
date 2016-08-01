## app.R ##
library(shiny)
library(shinydashboard)
library(networkD3)

sec1 <- fluidRow(
  valueBox("35.18M", "Total Records", icon = icon("credit-card")),
  
  # Dynamic valueBoxes
  valueBoxOutput("apBox"),
  
  valueBoxOutput("OFRCBox")
)

sec2 <- fluidRow( 
  box(
    title = "Information per Record",
    status = "primary",
    solidHeader = TRUE,
    collapsible = TRUE,
    simpleNetworkOutput("singleRecord", height = "300px")
  ), 
  box(
    title = "Increase of Records per Year",
    status = "primary",
    solidHeader = TRUE,
    collapsible = TRUE,
    plotOutput("", height = "300px")
  )
)

sec3  <- fluidRow(
  box(
    title = "Matching Rate",
    status = "primary",
    solidHeader = TRUE,
    collapsible = TRUE,
    plotOutput("matchRate", height = "300px")
  ),
  box(
    title = "Matching Rate per State",
    status = "primary",
    solidHeader = TRUE,
    collapsible = TRUE,
    plotOutput("", height = "300px")
  )
)

body <- dashboardBody(sec1, sec2, sec3)

ui <- dashboardPage(
  dashboardHeader(title = "MKB Dashboard", 
        dropdownMenu(type = "notifications",
                     notificationItem(
                       text = "5 new users today",
                       icon("users")
                     ),
                     notificationItem(
                       text = "12 items delivered",
                       icon("truck"),
                       status = "success"
                     ),
                     notificationItem(
                       text = "Server load at 86%",
                       icon = icon("exclamation-triangle"),
                       status = "warning"
                     )
        )),
  
        dashboardSidebar(
          sidebarMenu(
            menuItem("Dashboard", tabName = "dashboard", icon = icon("dashboard")),
            menuItem("Widgets", icon = icon("th"), tabName = "widgets")
          )), body
)

server <- function(input, output) { 
  # kpi 2, AP files 3384261 / 35180442) * 100
  output$apBox <- renderValueBox({
    valueBox(
      paste0("3.4M"), "AP Volumn", icon = icon("list"),
      color = "purple"
    )
  })
  
  output$OFRCBox <- renderValueBox({
    valueBox(
      "21,622", "OFRC Volumn", icon = icon("list", lib = "glyphicon"),
      color = "yellow"
    )
  })
  output$singleRecord <- renderSimpleNetwork({
    src <- c("A", "A", "A", "A", "B", "B", "C", "C", "D")
    target <- c("B", "C", "D", "J", "E", "F", "G", "H", "I")
    networkData <- data.frame(src, target)
    simpleNetwork(networkData, opacity = input$opacity)
  })
  
  output$matchRate <- renderPlot({
    
  })
  
}

shinyApp(ui, server)
