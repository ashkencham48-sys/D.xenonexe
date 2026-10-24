package com.example

import android.annotation.SuppressLint
import android.graphics.Color
import android.os.Bundle
import android.view.View
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.systemBarsPadding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.viewinterop.AndroidView
import com.example.ui.theme.MyApplicationTheme
import com.example.ui.theme.VoidBlack

class MainActivity : ComponentActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    enableEdgeToEdge()

    setContent {
      MyApplicationTheme {
        Box(
          modifier = Modifier
            .fillMaxSize()
            .background(VoidBlack)
            .systemBarsPadding()
            .testTag("main_screen_container")
        ) {
          DXenoWebViewScreen()
        }
      }
    }
  }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun DXenoWebViewScreen() {
  var webViewInstance by remember { mutableStateOf<WebView?>(null) }
  var canGoBackState by remember { mutableStateOf(false) }

  BackHandler(enabled = true) {
    webViewInstance?.let { wv ->
      // If modal is active, close it first via JS; otherwise go back
      wv.evaluateJavascript(
        "(function() { " +
          "var modal = document.querySelector('.system-modal-backdrop.active'); " +
          "var game = document.querySelector('.game-active-container.active'); " +
          "if (modal) { modal.classList.remove('active'); return true; } " +
          "if (game) { window.gamingArena.closeActiveGame(); return true; } " +
          "return false; " +
          "})()",
      ) { result ->
        if (result != "true") {
          if (wv.canGoBack()) {
            wv.goBack()
          }
        }
      }
    }
  }

  AndroidView(
    modifier = Modifier
      .fillMaxSize()
      .testTag("dxeno_webview"),
    factory = { context ->
      WebView(context).apply {
        layoutParams = ViewGroup.LayoutParams(
          ViewGroup.LayoutParams.MATCH_PARENT,
          ViewGroup.LayoutParams.MATCH_PARENT,
        )
        setBackgroundColor(Color.parseColor("#07040D"))
        setLayerType(View.LAYER_TYPE_HARDWARE, null)

        settings.apply {
          javaScriptEnabled = true
          domStorageEnabled = true
          databaseEnabled = true
          allowFileAccess = true
          allowContentAccess = true
          loadWithOverviewMode = true
          useWideViewPort = true
          cacheMode = WebSettings.LOAD_DEFAULT
          mediaPlaybackRequiresUserGesture = false
          mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        webViewClient = object : WebViewClient() {
          override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            canGoBackState = view?.canGoBack() == true
          }
        }

        webChromeClient = object : WebChromeClient() {
          override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
            return super.onConsoleMessage(consoleMessage)
          }
        }

        loadUrl("file:///android_asset/web/index.html")
        webViewInstance = this
      }
    },
    update = { wv ->
      webViewInstance = wv
    },
  )
}
