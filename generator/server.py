from datetime import datetime
import http.server, socketserver, json
from data import generateData, writeOutput


PORT = 8000


class HTTPHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        filename = str(datetime.now().timestamp())

        content_len = int(self.headers.get("Content-Length", 0))
        post_body = self.rfile.read(content_len)

        template = json.loads(post_body)
        data = generateData(template)
        writeOutput(data, template, filename)

        type = template["type"]
        self.send_response(200)
        self.send_header("Content-Type", f"text/{type}")
        self.send_header(
            "Content-Disposition", f'attachment; filename="{filename}.{type}"'
        )
        self.end_headers()

        outputFile = open(f"{filename}.{type}", "rb")

        return self.wfile.write(outputFile.read())


def startServer():
    with socketserver.TCPServer(("", PORT), HTTPHandler) as httpd:
        print("serving at port", PORT)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
        finally:
            httpd.server_close()
            httpd.shutdown()


if __name__ == "__main__":
    startServer()
